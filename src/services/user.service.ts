import { InferAttributes, Op } from 'sequelize'
import { Users, UsersAttributes, UsersCreationAttributes } from '../models/users'
import { Preferences } from '../models/preferences'
import { comparePassword, hashPassword } from '../utils/hash'
import { FederatedCredentials, FederatedCredentialsAttributes, FederatedCredentialsCreationAttributes } from '../models/federated-credentials'

/**
 * The preference text that indicates that a user wants
 * to study/work with someone.
 *
 * TODO: Move this text to be a different table and entity on the Models
 */
const COLABORATIVE_STUDY_PREFERENCE = 'alguien que me acompañe al estudiar'

/**
 * Service that encapsules data operations regarding users,
 * with find and create methods and password hashing
 */
export class UserService {
    constructor(
        private userModel: typeof Users,
        private preferenceModel: typeof Preferences,
        private credentialModel: typeof FederatedCredentials
    ) {}

    /**
     * Find and returns a User with the given ID. Resolves
     * to null if no such User exists
     * @param {number} id
     * @returns {Promise<Users | null>}
     */
    async findById(id: number): Promise<Users | null> {
        return await this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password'],
            },
            include: {
                model: this.preferenceModel,
                as: 'preferences',
                attributes: [
                    'time_day',
                    'subject',
                    'contact',
                    'people',
                    'contact_type',
                ],
            },
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
        })

        return found.length > 0
    }

    /**
     * Finds or creates a Federated Credentials
     * associated to a given user, as the one used by Google
     *
     * @param {UsersAttributes} user
     * @returns {Promise<Users | null>} The created or found User
     */
    async findOrCreateFederatedCredential(
        user: UsersCreationAttributes,
        credential: FederatedCredentialsCreationAttributes 
    ): Promise<Users | null> {
        let userToReturn: Users;
        userToReturn = await this.userModel.findOne({
            where: {
                [Op.or]: {
                    name: user.name,
                    email: user.email,
                },
            },
        })

        // If a user exists with a certain email,
        // but its not registered with Google,
        // then return null
        if (userToReturn) {
            console.log('=============');
            console.log(userToReturn, userToReturn?.id);
            console.log('=============');
            const hasCredential = await this.credentialModel.findOne({
                where: { 
                    userId: userToReturn?.id,
                    provider: credential.provider,
                }
            });

            if (hasCredential) {
                return null;
            }
        }

        if (!userToReturn) {
            const hashedPassword = await hashPassword(user.password);

            userToReturn = await this.userModel.create({
                ...user,
                password: hashedPassword
            });
        }

        await this.credentialModel.findOrCreate({
            where: {
                subject: credential.subject,
                provider: credential.provider,
                userId: userToReturn.id,
            }
        });

        return userToReturn; 
    }

    /**
     * Finds a user with the given username
     * and email, creating it if it does not exist already
     *
     * @param {UsersAttributes} user
     * @returns {Promise<Users | null>} The created or found User
     */
    async findOrCreate(user: UsersAttributes): Promise<Users | null> {
        const found = await this.userModel.findOne({
            where: {
                [Op.or]: {
                    name: user.name,
                    email: user.email,
                },
            },
        })

        if (found) {
            return found
        }

        const hashed = await hashPassword(user.password)

        const created = await this.userModel.create({
            ...user,
            password: hashed,
        })

        return created
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
     * If the user has a federated credential,
     * then this login returns null
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Users | null>} The logged in User or null
     * in case of errors while logging
     */
    async login(username: string, password: string): Promise<Users | null> {
        const found = await this.findByUsername(username);

        if (!found) return null

        const hasCredential = await this.credentialModel.findOne({
            where: { userId: found?.id }
        });

        if (hasCredential) {
            return null;
        }

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

    /**
     * Finds all users with their preferences attached
     *
     * @returns {Promise<Users[]>}
     */
    async findAllUsers(): Promise<Users[]> {
        return await this.userModel.findAll({
            include: [
                {
                    model: Preferences,
                    as: 'preferences',
                    attributes: [
                        'time_day',
                        'subject',
                        'contact',
                        'people',
                        'contact_type',
                    ],
                },
            ],
        })
    }

    /**
     * Finds all users and attaches a `match` score that indicates
     * the level in which the preference of each user matches
     * with the current one.
     *
     * @param {number} userId The user's ID whose preference we
     * want to match against all other users
     * @returns {Promise<(Users & { match: number })[]>}
     */
    async findUsersWithMatch(
        userId: number
    ): Promise<(UsersAttributes & { match: number })[]> {
        const allUsers = this.userModel.findAll({
            include: [
                {
                    model: Preferences,
                    as: 'preferences',
                    attributes: [
                        'time_day',
                        'subject',
                        'contact',
                        'people',
                        'contact_type',
                    ],
                },
            ],
            where: {
                id: {
                    [Op.ne]: userId,
                },
            },
        })
        const user = this.userModel.findByPk(userId, {
            include: [
                {
                    model: Preferences,
                    as: 'preferences',
                    attributes: [
                        'time_day',
                        'subject',
                        'contact',
                        'people',
                        'contact_type',
                    ],
                },
            ],
        })

        const [all, current] = await Promise.all([allUsers, user])
        const currentPreferences = current.preferences

        const withMatch = all.map((otherUser) => {
            let points = 0
            const preferences = otherUser.preferences

            // If a user has not registered any preferences,
            // then theirs points are zero
            console.log(currentPreferences, preferences)
            if (
                !currentPreferences ||
                !preferences ||
                preferences.length === 0
            ) {
                return { ...otherUser.dataValues, match: points }
            }

            // If both want to study/work with someone,
            // then add 10 points
            if (
                currentPreferences[0].people ===
                    COLABORATIVE_STUDY_PREFERENCE &&
                preferences[0].people === COLABORATIVE_STUDY_PREFERENCE
            ) {
                points += 10
            }

            // If both users study at the same
            // time of the day, then add 5 points
            if (currentPreferences[0].time_day == preferences[0].time_day) {
                points += 5
            }

            // If the subject which they find difficult,
            // the other does not find difficult, then add
            // 5 points.
            if (current.preferences[0].subject !== preferences[0].subject) {
                points += 5
            }

            return { ...otherUser.dataValues, match: points }
        })

        return withMatch.sort((a, b) => {
            return a.match - b.match
        })
    }
}

export const userService = new UserService(Users, Preferences, FederatedCredentials)
