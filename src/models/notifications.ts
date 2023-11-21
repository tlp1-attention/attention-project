import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { TypeNotifications, TypeNotificationsId } from './type-notifications'
import { Users } from './users'

export interface NotificationsAttributes {
    id: number
    title: string
    content: string
    typeId: number
    read: boolean
    userId: number
    createdAt: Date
    updatedAt: Date
}

export type NotificationsPk = 'id'
export type NotificationsId = Notifications[NotificationsPk]
export type NotificationsOptionalAttributes = 'id' | 'read' | 'createdAt' | 'updatedAt'
export type NotificationCreationAttributes = Optional<
    NotificationsAttributes,
    NotificationsOptionalAttributes
>

export class Notifications
    extends Model<NotificationsAttributes, NotificationCreationAttributes>
    implements NotificationsAttributes
{
    declare id: number
    declare read: boolean
    declare title: string
    declare content: string
    declare userId: number
    declare typeId: number
    declare createdAt: Date
    declare updatedAt: Date

    // Notifications belongsTo TypeNotifications via typeId
    declare typeNotification: TypeNotifications
    declare getTypeNotification: Sequelize.BelongsToGetAssociationMixin<TypeNotifications>
    declare setTypeNotification: Sequelize.BelongsToSetAssociationMixin<
        TypeNotifications,
        TypeNotificationsId
    >
    declare createTypeNotification: Sequelize.BelongsToCreateAssociationMixin<TypeNotifications>

    static initModel(sequelize: Sequelize.Sequelize): typeof Notifications {
        return Notifications.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                content: {
                    type: DataTypes.TEXT('long'),
                    defaultValue: ''
                },
                typeId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'type_notifications',
                        key: 'id'
                    }
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Users,
                        key: 'id'
                    }
                },
                read: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'notifications',
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
