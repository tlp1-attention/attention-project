import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { Question, QuestionId } from './questions'
import { Users, UsersId } from './users';

export interface FederatedCredentialsAttributes {
    id: number
    userId?: number; 
    provider: string;
    subject: string;
    createdAt: Date
    updatedAt: Date
}

export type FederatedCredentialsPk = 'id'
export type FederatedCredentialsId = FederatedCredentials[FederatedCredentialsPk]
export type FederatedCredentialsOptionalAttributes =
    | 'id'
    | 'createdAt'
    | 'updatedAt'
export type FederatedCredentialsCreationAttributes = Optional<
    FederatedCredentialsAttributes,
    FederatedCredentialsOptionalAttributes
>

export class FederatedCredentials
    extends Model<FederatedCredentialsAttributes, FederatedCredentialsCreationAttributes>
    implements FederatedCredentialsAttributes
{
    declare id: number
    declare userId: number
    declare provider: string
    declare subject: string
    declare createdAt: Date
    declare updatedAt: Date

    // Generate associations for Users 
    declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>
    declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>
    declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>
    declare readonly user?: Users

    static initModel(sequelize: Sequelize.Sequelize): typeof FederatedCredentials {
        return FederatedCredentials.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Users,
                        key: 'id',
                    },
                },
                provider: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                subject: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
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
                tableName: 'federated_credentials',
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
