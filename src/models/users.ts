import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Preferences, PreferencesId } from './preferences'
import type { Reports, ReportsId } from './reports'
import type { Events, EventsId } from './events'
import type { PushSubscription } from 'web-push'

export interface UsersAttributes {
    id: number
    name: string
    email: string
    password: string
    description?: string
    ocupation?: string
    problem: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    subscriptionPayload?: string
}

export type UsersPk = 'id'
export type UsersId = Users[UsersPk]
export type UsersOptionalAttributes =
    | 'id'
    | 'description'
    | 'ocupation'
    | 'createdAt'
    | 'updatedAt'
    | 'subscriptionPayload'
    | 'problem'
    | 'deletedAt'
export type UsersCreationAttributes = Optional<
    UsersAttributes,
    UsersOptionalAttributes
>

export class Users
    extends Model<UsersAttributes, UsersCreationAttributes>
    implements UsersAttributes
{
    declare id: number
    declare name: string
    declare email: string
    declare password: string
    declare description?: string
    declare ocupation?: string
    declare problem: string
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt: Date
    declare subscriptionPayload?: string

    // Users hasMany Preferences via userId
    declare preferences: Preferences[]
    declare getPreferences: Sequelize.HasManyGetAssociationsMixin<Preferences>
    declare setPreferences: Sequelize.HasManySetAssociationsMixin<
        Preferences,
        PreferencesId
    >
    declare addPreference: Sequelize.HasManyAddAssociationMixin<
        Preferences,
        PreferencesId
    >
    declare addPreferences: Sequelize.HasManyAddAssociationsMixin<
        Preferences,
        PreferencesId
    >
    declare createPreference: Sequelize.HasManyCreateAssociationMixin<Preferences>
    declare removePreference: Sequelize.HasManyRemoveAssociationMixin<
        Preferences,
        PreferencesId
    >
    declare removePreferences: Sequelize.HasManyRemoveAssociationsMixin<
        Preferences,
        PreferencesId
    >
    declare hasPreference: Sequelize.HasManyHasAssociationMixin<
        Preferences,
        PreferencesId
    >
    declare hasPreferences: Sequelize.HasManyHasAssociationsMixin<
        Preferences,
        PreferencesId
    >
    declare countPreferences: Sequelize.HasManyCountAssociationsMixin
    // Users hasMany Reports via userId
    declare reports: Reports[]
    declare getReports: Sequelize.HasManyGetAssociationsMixin<Reports>
    declare setReports: Sequelize.HasManySetAssociationsMixin<
        Reports,
        ReportsId
    >
    declare addReport: Sequelize.HasManyAddAssociationMixin<Reports, ReportsId>
    declare addReports: Sequelize.HasManyAddAssociationsMixin<
        Reports,
        ReportsId
    >
    declare createReport: Sequelize.HasManyCreateAssociationMixin<Reports>
    declare removeReport: Sequelize.HasManyRemoveAssociationMixin<
        Reports,
        ReportsId
    >
    declare removeReports: Sequelize.HasManyRemoveAssociationsMixin<
        Reports,
        ReportsId
    >
    declare hasReport: Sequelize.HasManyHasAssociationMixin<Reports, ReportsId>
    declare hasReports: Sequelize.HasManyHasAssociationsMixin<
        Reports,
        ReportsId
    >
    declare countReports: Sequelize.HasManyCountAssociationsMixin
    // Users hasMany Events via userId
    events!: Events[]
    declare getEvents: Sequelize.HasManyGetAssociationsMixin<Events>
    declare setEvents: Sequelize.HasManySetAssociationsMixin<Events, EventsId>
    declare addEvent: Sequelize.HasManyAddAssociationMixin<Events, EventsId>
    declare addEvents: Sequelize.HasManyAddAssociationsMixin<Events, EventsId>
    declare createEvent: Sequelize.HasManyCreateAssociationMixin<Events>
    declare removeEvent: Sequelize.HasManyRemoveAssociationMixin<
        Events,
        EventsId
    >
    declare removeEvents: Sequelize.HasManyRemoveAssociationsMixin<
        Events,
        EventsId
    >
    declare hasEvent: Sequelize.HasManyHasAssociationMixin<Events, EventsId>
    declare hasEvents: Sequelize.HasManyHasAssociationsMixin<Events, EventsId>
    declare countEvents: Sequelize.HasManyCountAssociationsMixin

    static initModel(sequelize: Sequelize.Sequelize): typeof Users {
        return Users.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        isEmail: true,
                    },
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    },
                },
                description: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                ocupation: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                problem: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                subscriptionPayload: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'users',
                timestamps: true,
                paranoid: true,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                ],
            }
        )
    }
}
