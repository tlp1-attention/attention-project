import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Answers, AnswersId } from './answers'
import type {
    CompleteExercises,
    CompleteExercisesId,
} from './complete_exercises'
import { Question, QuestionId } from './questions'

export interface NotificationsAttributes {
    id: number
    title: string
    content: string;
    typeId: number;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type NotificationPk = 'id'
export type NotificationId = Notifications[NotificationPk]
export type NotificationsOptionalAttributes =
    | 'id'
    | 'title'
    | 'content'
    | 'read'
    | 'typeId'
    | 'createdAt'
    | 'updatedAt';
export type NotificationCreationAttributes = Optional<
    NotificationsAttributes,
    NotificationsOptionalAttributes
>

export class Notifications 
    extends Model<NotificationsAttributes, NotificationCreationAttributes>
    implements NotificationsAttributes 
{
    declare id: number
    declare read?: boolean; 
    declare title: string;
    declare content: string;
    declare typeId: number;
    declare createdAt: Date
    declare updatedAt: Date

    // Exercises hasMany Questions svia exerciseId
    declare typeNotification: TypeNotification
    declare getQuestion: Sequelize.HasManyGetAssociationsMixin<Question>
    declare setQuestion: Sequelize.HasManySetAssociationsMixin<
        Question,
        QuestionId
    >
    declare addQuestion: Sequelize.HasManyAddAssociationMixin<
        Question,
        QuestionId
    >
    declare addQuestions: Sequelize.HasManyAddAssociationsMixin<
        Question,
        QuestionId
    >
    declare createQuestion: Sequelize.HasManyCreateAssociationMixin<Question>
    declare removeQuestion: Sequelize.HasManyRemoveAssociationMixin<
        Question,
        QuestionId
    >
    declare removeQuestions: Sequelize.HasManyRemoveAssociationsMixin<
        Question,
        QuestionId
    >
    declare hasQuestion: Sequelize.HasManyHasAssociationMixin<
        Question,
        QuestionId
    >
    declare hasQuestions: Sequelize.HasManyHasAssociationsMixin<
        Question,
        QuestionId
    >
    declare countQuestions: Sequelize.HasManyCountAssociationsMixin

    static initModel(sequelize: Sequelize.Sequelize): typeof Exercises {
        return Notifications.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                read: {
                    type: DataTypes.TEXT('long'),
                    allowNull: true,
                },
                readTitle: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                readSummary: {
                    type: DataTypes.TEXT('medium'),
                    allowNull: false,
                },
                readCoverPath: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                difficulty: {
                    type: DataTypes.ENUM(
                        DIFFICULTIES.EASY,
                        DIFFICULTIES.EXPERT,
                        DIFFICULTIES.MEDIUM
                    ),
                    allowNull: true,
                },
                questionId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                memorama_tematic: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                memorama_img: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                puzzle_name: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                puzzle: {
                    type: DataTypes.STRING(255),
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
                tableName: 'exercises',
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
