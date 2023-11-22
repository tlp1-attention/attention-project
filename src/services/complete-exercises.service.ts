import { InferAttributes, InferCreationAttributes, Op } from 'sequelize'
import { CompleteExercises } from '../models/complete_exercises'
import { sequelize } from '../database/connection'
import { emitterService as _emitterService } from './emitter/emitter.service'
import { APP_EVENTS } from './emitter/emit.interface'

/**
 * Class that encapsulates data operations regarding CompleteExercises.
 */
export class CompleteExercisesService {
    constructor(
        private completeExerciseModel: typeof CompleteExercises,
        private emitterService: typeof _emitterService
    ) {}

    /**
     * Find all complete exercises
     *
     * @returns {Promise<CompleteExercises | null>}
     */
    async findAll(): Promise<CompleteExercises[]> {
        return this.completeExerciseModel.findAll()
    }

    /**
     * Find and returns a complete exercises with the given ID,
     * if belongs to a user with the given userId
     *
     *
     * @param {number} id
     * @param {number} userId
     * @returns {Promise<CompleteExercises | null>}
     */
    async findById(
        id: number,
        userId: number
    ): Promise<CompleteExercises | null> {
        return this.completeExerciseModel.findOne({
            where: {
                id,
                userId,
            },
        })
    }

    /**
     * Finds all complete exercise by userId
     *
     * @param {number} userId
     * @returns {Promise<CompleteExercises[]>}
     */
    async findByUserId(userId: number): Promise<CompleteExercises[]> {
        const found = await this.completeExerciseModel.findAll({
            where: { userId },
        })
        return found
    }

    /**
     * Creates a complete exercises given its data and
     * a userId
     * Returns the newly created CompleteExercise
     *
     * @param {number} userId
     * @param {InferCreationAttributes<CompleteExercises>} data An object
     * with the desired data to create the Exercise
     * @returns {Promise<Exercises>} The created Exercise
     */
    async create(
        userId: number,
        data: InferCreationAttributes<CompleteExercises>
    ): Promise<CompleteExercises | null> {
        const created = await this.completeExerciseModel.create({
            userId,
            ...data,
        })

        // Verify if the user has reached a record
        // of completed exercises
        const completedExercises = await this.completeExerciseModel.count({
            where: {
                userId,
                typeExerciseId: 1,
            },
        })

        if (completedExercises % 10 === 0) {
            this.emitterService.emit(
                APP_EVENTS.COMPLETED_EXERCISE.RECORD,
                completedExercises,
                userId
            )
        }

        return created
    }

    /**
     * Updates and returns the complete exercise with the given ID and the provided
     * data. Returns null in case of not finding the Completed Exercise or if it
     * does not belong to the given userId
     *
     * @param {number} id The exercise's ID
     * @param {number} userId
     * @param {InferAttributes<CompleteExercises>} data The data to use when updating
     * @returns {Promise<CompleteExercises | null>} The updated exercise or null
     */
    async update(
        id: number,
        userId: number,
        data: InferAttributes<CompleteExercises>
    ): Promise<CompleteExercises | null> {
        const found = await this.completeExerciseModel.findOne({
            where: { id, userId },
        })
        if (!found) return null
        await found.update(data)
        return found
    }

    /**
     * Delete the completed exercise with the given ID and
     * its userId
     *
     * @param {number} id
     * @returns {Promise<CompleteExercises | null>} The deleted instance or null if none was found
     */
    async delete(
        id: number,
        userId: number
    ): Promise<CompleteExercises | null> {
        const found = await this.findById(id, userId)
        if (!found) return null
        await found.destroy()
        return found
    }

    /**
     * Groups readings by the week in which they were
     * created. Returns the count of reading,
     * the start of the week, the end of the week and
     * the week number
     *
     * @param {number} userId
     */
    async groupByWeek(userId: number) {
        const [readingsByWeek] = await sequelize.query({
            query: `
            SELECT WEEK(createdAt) as weekNumber, 
            COUNT(id) as readingCount,
            DATE_ADD(createdAt, INTERVAL(1-DAYOFWEEK(createdAt)) DAY) as startWeek, 
            DATE_ADD(createdAt, INTERVAL(7-DAYOFWEEK(createdAt)) DAY) as endWeek
            FROM \`complete_exercises\` WHERE userId = ? AND typeExerciseId = ? 
            GROUP BY WEEK(createdAt) ORDER BY WEEK(createdAt) ASC; 
        `,
            values: [userId, 1],
        })

        console.log(readingsByWeek)

        return readingsByWeek as {
            weekNumber: number
            startWeek: Date
            endWeek: Date
            readingCount: number
        }[]
    }
}

export const completeExerciseService = new CompleteExercisesService(
    CompleteExercises,
    _emitterService
)
