import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { Notifications, NotificationsId } from './notifications'

export interface TypeNotificationsAttributes {
    id: number;
    description: string;
    iconUrl: string;
    createdAt: Date
    updatedAt: Date
}

export type TypeNotificationsPk = 'id'
export type TypeNotificationsId = TypeNotifications[TypeNotificationsPk]
export type TypeNotificationsOptionalAttributes =
    | 'id'
    | 'createdAt'
    | 'updatedAt';
export type TypeNotificationsCreationAttributes = Optional<
    TypeNotificationsAttributes,
    TypeNotificationsOptionalAttributes
>

export class TypeNotifications
    extends Model<TypeNotificationsAttributes, TypeNotificationsCreationAttributes>
    implements TypeNotificationsAttributes
{
    declare id: number
    declare description: string;
    declare iconUrl: string;
    declare createdAt: Date
    declare updatedAt: Date

    // TypeNotifications hasMany Answers via exerciseId
    declare notifications: Notifications[]
    declare getNotifications: Sequelize.HasManyGetAssociationsMixin<Notifications>
    declare setNotifications: Sequelize.HasManySetAssociationsMixin<
        Notifications,
        NotificationsId 
    >
    declare addNotification: Sequelize.HasManyAddAssociationMixin<Notifications, NotificationsId>
    declare addNotifications: Sequelize.HasManyAddAssociationsMixin<
        Notifications,
        NotificationsId 
    >
    declare createNotifications: Sequelize.HasManyCreateAssociationMixin<Notifications>
    declare removeNotification: Sequelize.HasManyRemoveAssociationMixin<
        Notifications,
        NotificationsId
    >
    declare removeAnswers: Sequelize.HasManyRemoveAssociationsMixin<
        Notifications,
        NotificationsId 
    >
    declare hasNotification: Sequelize.HasManyHasAssociationMixin<Notifications, NotificationsId>
    declare hasAnswers: Sequelize.HasManyHasAssociationsMixin<
        Notifications,
        NotificationsId 
    >

    declare countNotifications: Sequelize.HasManyCountAssociationsMixin

    static initModel(sequelize: Sequelize.Sequelize): typeof TypeNotifications {
        return TypeNotifications.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                iconUrl: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false
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
                tableName: 'type_notifications',
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
