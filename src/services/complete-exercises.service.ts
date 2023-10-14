import { InferAttributes, InferCreationAttributes, Op } from 'sequelize'
import { CompleteExercises } from '../models/complete_exercises';

/**
 * Class that encapsulates data operations regarding CompleteExercises.
 */
export class CompleteExercisesService {
    constructor(
        private completeExerciseModel: typeof CompleteExercises,
    ) {}

    /**
     * Find all complete exercises 
     * 
     * @returns {Promise<CompleteExercises | null>}
     */
    async findAll(): Promise<CompleteExercises[]> {
        return this.completeExerciseModel.findAll();
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
    async findById(id: number, userId: number): Promise<CompleteExercises | null> {
        return this.completeExerciseModel.findOne({
            where: {
                id,
                userId
            }
        });
    }

    /**
     * Finds all complete exercise by userId
     * 
     * @param {number} userId
     * @returns {Promise<CompleteExercises[]>} 
     */
    async findByUserId(userId: number): Promise<CompleteExercises[]> {
        const found = await this.completeExerciseModel.findAll({
            where: { userId }
        });
        return found;
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
        });

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
            where: { id, userId }
        });
        if (!found) return null;
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
    async delete(id: number, userId: number): Promise<CompleteExercises | null> {
        const found = await this.findById(id, userId);
        if (!found) return null;
        await found.destroy();
        return found
    }
}

export const completeExerciseService = new CompleteExercisesService(CompleteExercises);
