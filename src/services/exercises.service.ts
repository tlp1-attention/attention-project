import { InferAttributes, InferCreationAttributes, Op } from 'sequelize'
import { Exercises } from '../models/exercises';
import { Question } from '../models/questions';
import { Responses } from '../models/responses';
/**
 * Class that encapsulates data operations regarding Readings.
 */
export class ExercisesService {
    constructor(
        private exerciseModel: typeof Exercises,
        private questionModel: typeof Question
    ) {}

    /**
     * Find all exercises which are readings 
     * and returns them. Accepts a optional
     * to match the title of the reading or the
     * content
     * 
     * @returns {Promise<Exercises | null>}
     */
    async findAllReadings(query: string = ""): Promise<Exercises[]> {
        return this.exerciseModel.findAll({
            where: {
                read: {
                    [Op.ne]: null,
                },
                [Op.or]: [
                    {
                        read: {
                            [Op.like]: `%${query}%`
                        }
                    },
                    {
                        readTitle: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            }
        });
    }

    /**
     * Find and returns a reading with the given ID. Resolves
     * to null if no such Exercise exists or if it's not 
     * Reading
     * @param {number} id
     * @returns {Promise<Exercises | null>}
     */
    async findById(id: number): Promise<Exercises | null> {
        const exercise = await this.exerciseModel.findByPk(id);
        return exercise.read ? exercise : null;
    }

    /**
     * Creates a reading exercise given its data
     * Returns the newly created Exercise
     * @param {InferCreationAttributes<Exercises>} eventData An object
     * with the desired data to create the Exercise 
     * @returns {Promise<Exercises>} The created Exercise 
     */
    async create(
        exerciseData: InferCreationAttributes<Exercises>
    ): Promise<Exercises | null> {
        const created = await this.exerciseModel.create({
            ...exerciseData,
        });

        return created
    }

    /**
     * Updates and returns the exercise with the given ID and the provided
     * data. Returns null in case of not finding the Exercises 
     *
     * @param {number} id The exercise's ID
     * @param {InferAttributes<Events>} exerciseData The data to use when updating
     * @returns {Promise<Events | null>} The updated event or null
     */
    async update(
        id: number,
        eventData: InferAttributes<Exercises>
    ): Promise<Exercises | null> {
        const found = await this.findById(id)
        if (!found) return null;
        await found.update(eventData)
        return found
    }

    /**
     * Delete the exercise with the given ID.
     *
     * @param {number} id
     * @returns {Promise<Exercises | null>} The deleted instance or null if none was found
     */
    async delete(id: number): Promise<Exercises | null> {
        const found = await this.findById(id)
        if (!found) return null
        await found.destroy()
        return found
    }

    /**
     * Finds all the question for a given reading.
     * If the reading does not exist, it returns null
     * 
     * @param {number} id 
     * @returns {Promise<Question[] | null>} 
     */
    async findQuestionsForReading(id: number)
    : Promise<Question[] | null> {
        const questions = await this.questionModel.findAll({
            where: {
                exerciseId: id
            },
            include: { model: Responses, as: 'response' }
        });

        if (!questions || questions.length === 0) {
            return null;
        }
        return questions;
    }
}

export const exerciseService = new ExercisesService(Exercises, Question);
