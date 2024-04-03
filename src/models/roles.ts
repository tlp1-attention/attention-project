import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Users, UsersPk } from './users';

export const AppRoles = {
    USER: 'USER',
    ADMIN: 'ADMIN'
} as const;

export const AppRolesId = {
    [AppRoles.USER]: 1,
    [AppRoles.ADMIN]: 2
} as const;

export const DEFAULT_ROLES: RolesCreationAttributes[] = [
    {
        id: 1,
        name: AppRoles.USER,
    },
    {
        id: 2,
        name: AppRoles.ADMIN
    }
];

export interface RolesAttributes {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export type RolesPk = 'id'
export type RolesId = Roles[RolesPk]
export type RolesOptionalAttributes =
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt';
export type RolesCreationAttributes = Optional<
    RolesAttributes,
    RolesOptionalAttributes
>

export class Roles
    extends Model<RolesAttributes, RolesCreationAttributes>
    implements RolesAttributes
{
    declare id: number
    declare name: string
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt: Date

    // Roles hasMany Users via roleId
    declare users: Users[]
    declare getUsers: Sequelize.HasManyGetAssociationsMixin<Users>
    declare setUsers: Sequelize.HasManySetAssociationsMixin<
        Users,
        UsersPk
    >

    declare addUser: Sequelize.HasManyAddAssociationMixin<
        Users,
        UsersPk 
    >
    declare addUsers: Sequelize.HasManyAddAssociationsMixin<
        Users,
        UsersPk
    >
    declare createUser: Sequelize.HasManyCreateAssociationMixin<Users>
    declare removeUser: Sequelize.HasManyRemoveAssociationMixin<
        Users,
        UsersPk 
    >
    declare removeUsers: Sequelize.HasManyRemoveAssociationsMixin<
        Users,
        UsersPk 
    >
    declare hasUser: Sequelize.HasManyHasAssociationMixin<
        Users,
        UsersPk 
    >
    declare hasUsers: Sequelize.HasManyHasAssociationsMixin<
        Users,
        UsersPk
    >
    declare countUsers: Sequelize.HasManyCountAssociationsMixin

    static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
        return Roles.init(
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
            },
            {
                sequelize,
                tableName: 'roles',
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
