import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Preferences } from '../models/preferences'
import { UserService, userService } from './user.service'
/**
 * Service that encapsules data operations regarding Preferences,
 * with find and create methods and password hashing
 */
export class PreferenceService {
    constructor(
        private preferencesModel: typeof Preferences,
        private userService: UserService
    ) { }

    /**
     * Find all preferences of the given userId's
     *
     * @param {number[]} userIds
     * @returns {Promise<(Preferences | null)[]>}
     */
    async findForUsers(userIds: number[]): Promise<(Preferences | null)[]> {
        return Promise.all(userIds.map((id) => this.findByUserId(id)))
    }

    /**
     * Find and returns the preferences from a User
     * with the given ID. Resolves
     * to null if no such User exists
     * @param {number} userId
     * @returns {Promise<Preferences | null>}
     */
    async findByUserId(userId: number): Promise<Preferences | null> {
        return await this.preferencesModel.findOne({
            where: { userId },
        })
    }

    /**
     * Creates an preferences instance given its data and the user's ID.
     * Returns the newly created Preference or null if there was
     * a problem in creation.
     * @param {number} userId
     * @param {InferCreationAttributes<Preferences>} preferences
     * @returns {Promise<Preferences | null>} The created Event or null if
     * there was a conflict
     */
    async create(
        userId: number,
        preferences: InferCreationAttributes<Preferences>
    ): Promise<Preferences | null> {
        const userExists = await this.userService.findById(userId)

        if (!userExists) {
            return null
        }

        const created = await this.preferencesModel.create({
            ...preferences,
            userId,
        })

        return created
    }

    /**
     * Deletes the preferences for the given userId.
     *
     * @param {number} userId
     * @returns {Promise<Preferences | null>} The deleted instance or null if none was found
     */
    async delete(userId: number): Promise<Preferences | null> {
        const found = await this.findByUserId(userId)
        if (!found) return null
        await found.destroy()
        return found
    }

    /**
     * Updates the given preferences with the given userId and the provided
     * data. Returns null in case of not finding the User
     *
     * @param {number} userId The User's ID
     * @param {InferAttributes<Preferences>} preferences The data to use when updating
     * @returns {Promise<Preferences | null>}
     */
    async update(
        userId: number,
        preferences: InferAttributes<Preferences>
    ): Promise<Preferences | null> {
        const found = await this.findByUserId(userId)
        if (!found) return null
        return await found.update(preferences)
    }

    async findOrCreate(
        userId: number,
        preferences: InferAttributes<Preferences>
    ): Promise<Preferences | null> {
        const found = await this.findByUserId(userId)
        if (!found) return this.create(userId, preferences)
        return await found.update(preferences)
    }
}

export const preferencesService = new PreferenceService(
    Preferences,
    userService
)
