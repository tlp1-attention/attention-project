import {
    FindOptions,
    GroupedCountResultItem,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    Op,
    WhereOptions,
} from 'sequelize'
import { Events, EventsAttributes } from '../models/events'
import { UserService, userService } from './user.service'
import { sequelize } from '../database/connection'

type OrderOptions<M extends Model<any, any>> = {
    field: keyof InferAttributes<M>
    type: 'asc' | 'desc'
}

type FilterByTimeOptions = 'future' | 'past'


/**
 * Class that encapsulates data operations regarding Events.
 * Uses usersService to retrieve data from users that
 * created events
 */
export class EventService {
    constructor(
        private eventModel: typeof Events,
        private usersService: UserService
    ) {}

    /**
     * Find and returns an event with the given ID. Resolves
     * to null if no such Event exists
     * @param {number} id
     * @returns {Promise<Events | null>}
     */
    async findById(id: number): Promise<Events | null> {
        return await this.eventModel.findByPk(id)
    }

    /**
     * Returns whether an Event belongs to a given user,
     *
     * @param {number} eventId
     * @param {number} userId
     * @returns {Promise<boolean>}
     */
    async belongsToUser(eventId: number, userId: number): Promise<boolean> {
        const found = await this.eventModel.findAll({
            where: {
                id: eventId,
                userId,
            },
        })
        return found.length > 0
    }

    /**
     * Creates an event given its data and the user's ID.
     * Returns the newly created Event or null if there was
     * a problem in creation. For example,
     * @param {number} userId
     * @param {InferCreationAttributes<Events>} eventData An object
     * with the desired data to create the Event
     * @returns {Promise<Events | null>} The created Event or null if
     * there was a conflict
     */
    async create(
        userId: number,
        eventData: InferCreationAttributes<Events>
    ): Promise<Events | null> {
        const userExists = await this.usersService.findById(userId)

        if (!userExists) {
            return null
        }

        const created = await this.eventModel.create({
            ...eventData,
            userId,
        })

        return created
    }

    /**
     * Finds all the events from a User, given its ID.
     * Receives and object with the ordering options
     *
     * @returns {Promise<Events[]>}
     */
    async findByUserId(
        id: number,
        filter?: Record<keyof EventsAttributes, any>,
        order?: OrderOptions<Events>,
    ): Promise<Events[]> {
        let query: FindOptions<Events> = {}

        if (order) {
            console.log(order);
            query = Object.assign(query, {
                order: [[order.field, order.type.toUpperCase()]],
            })
        }
        
        let filterOrDefault = filter ?? {};

        // If filters are passed a string
        // which starts with +, we filter only future dates,
        // and, if it starts with -, we filter only past dates
        if (filter?.startDate && filter.startDate.startsWith("+")) {
            filterOrDefault = {
                ...filterOrDefault,
                startDate: {
                    [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP')
                }
            }
        } else if (filter?.startDate && filter.startDate.startsWith("-")) {
           filterOrDefault = {
                ...filterOrDefault,
                startDate: {
                    [Op.lt]: sequelize.literal('CURRENT_TIMESTAMP')
                }
           } 
        }

        console.log(filterOrDefault);

        const options = {
            where: {
                ...filterOrDefault,
                userId: id,
            },
            ...(query ?? {}),
        }
        console.log(options);
        return this.eventModel.findAll(options);
    }

    /**
     * Updates and returns the event with the given ID and the provided
     * data. Returns null in case of not finding the Event
     *
     * @param {number} id The event's ID
     * @param {InferAttributes<Events>} eventData The data to use when updating
     * @returns {Promise<Events | null>} The updated event or null
     */
    async update(
        id: number,
        eventData: InferAttributes<Events>
    ): Promise<Events | null> {
        const found = await this.findById(id)
        if (!found) return null
        await found.update(eventData)
        return found
    }

    /**
     * Delete the event with the given ID.
     *
     * @param {number} id
     * @returns {Promise<Events | null>} The deleted instance or null if none was found
     */
    async delete(id: number): Promise<Events | null> {
        const found = await this.findById(id)
        if (!found) return null
        await found.destroy()
        return found
    }

    /**
     * Groups events by the week in which they were created
     * and returns the count, and the week in question.
     *
     * @param {number} userId
     */
    async getCountByWeek(userId: number) {
        const [eventsByWeek] = await sequelize.query({
            query: `
            SELECT WEEK(createdAt) as weekNumber, 
            COUNT(id) as eventCount,
            DATE_ADD(createdAt, INTERVAL(1-DAYOFWEEK(createdAt)) DAY) as startWeek, 
            DATE_ADD(createdAt, INTERVAL(7-DAYOFWEEK(createdAt)) DAY) as endWeek
            FROM \`events\` WHERE userId = ? GROUP BY WEEK(createdAt) ORDER BY WEEK(createdAt) DESC; 
        `,
            values: [userId],
        })

        console.log(eventsByWeek)

        return eventsByWeek as {
            weekNumber: number
            startWeek: Date
            endWeek: Date
            eventCount: number
        }[]
    }

    /**
     * Gets all the attributes for an Event
     */
    getAttributes(): keyof EventsAttributes {
        return Object.keys(
            this.eventModel.getAttributes()
        ) as unknown as keyof EventsAttributes;
    }
}

export const eventService = new EventService(Events, userService)
