import { InferAttributes, Op } from 'sequelize'
import { Users } from '../models/users'
import { comparePassword, hashPassword } from '../utils/hash'
import { Preferences } from '../models/preferences'
/**
 * Service that encapsules data operations regarding users,
 * with find and create methods and password hashing
 */
export class UserService {
    constructor(private userModel: typeof Users) { }

    /**
     * Find and returns a User with the given ID. Resolves
     * to null if no such User exists
     * @param {number} id
     * @returns {Promise<Users | null>}
     */
    async findById(id: number): Promise<Users | null> {
        return await this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        })
    }

    /**
     * Returns whether an Email belongs to
     * a registered user or not.
     * @param {string} email
     * @returns {Promise<boolean>}
     */
    async existsWithEmail(email: string): Promise<boolean> {
        const found = await this.userModel.findAll({
            where: {
                email,
            },
        })
        return found.length > 0
    }

    /**
     * Returns whether a pair username email belongs to
     * a registered user or not.
     * @param {string} username
     * @param {string} email
     * @returns {Promise<boolean>}
     */
    async exists(username: string, email: string): Promise<boolean> {
        const found = await this.userModel.findAll({
            where: {
                [Op.or]: {
                    name: username,
                    email,
                },
            },
        });

        return found.length > 0;
    }

    /**
     * Registers a user given its username, password and email.
     * Returns the newly created User or null if there was
     * conflicting records. Hashes the password for storage
     *
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Users | null>} The created User or null if
     * there was a conflict
     */
    async register(
        username: string,
        email: string,
        password: string
    ): Promise<Users | null> {

        if (await this.exists(username, email)) {
            return null
        }

        const hashedPassword = await hashPassword(password)

        const created = await this.userModel.create({
            name: username,
            email,
            password: hashedPassword,
        })

        return created
    }
    /**
     * Logs in a user given its username and password.
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Users | null>} The logged in User or null
     * in case of errors while logging
     */
    async login(username: string, password: string): Promise<Users | null> {
        const found = await this.findByUsername(username)
        if (!found) return null

        const passwordMatch = await comparePassword(password, found.password)

        return passwordMatch ? found : null
    }

    /**
     * Finds a user with the given username. Returns null
     * in case of none found
     *
     * @param {string} username
     * @returns {Promise<Users | null>} Whether both username and password match
     * with the given values
     */
    async findByUsername(username: string): Promise<Users | null> {
        return (
            this.userModel.findOne({
                where: {
                    name: username,
                },
            }) ?? null
        )
    }

    /**
     * Updates the user with the given ID and the provided
     * data. Returns null in case of not finding the User
     *
     * @param {number} id The users' ID
     * @param {InferAttributes<Users>} userData The data to use when updating
     * @returns {Promise<Users | null>} Whether both username and password match
     * with the given values
     */
    async update(
        id: number,
        userData: InferAttributes<Users>
    ): Promise<Users | null> {
        const found = await this.findById(id)
        if (!found) return null
        return await found.update(userData)
    }

    async findAllUsers(): Promise<Users[] | []> {
        return await this.userModel.findAll({
            include: {
                model: Preferences,
                as: 'preferences',
            }
        })
    }
}

export const userService = new UserService(Users)
