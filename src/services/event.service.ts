import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Events } from '../models/events'
import { UserService, userService } from './user.service'
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

        const created = await this.eventModel.create(eventData)

        return created
    }

    /**
     * Finds all the events from a User, given its ID.
     *
     * @returns {Promise<Events[]>}
     */
    async findByUserId(id: number): Promise<Events[]> {
        return this.eventModel.findAll({
            where: {
                userId: id,
            },
        })
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
}

export const eventService = new EventService(Events, userService)
