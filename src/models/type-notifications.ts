import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Answers, AnswersId } from './answers'
import type {
    CompleteTypeNotifications,
    CompleteTypeNotificationsId,
} from './complete_exercises'
import { Question, QuestionId } from './questions'

export interface TypeNotificationsAttributes {
    id: number;
    description: string;
    createdAt: Date
    updatedAt: Date
}

export type TypeNotificationsPk = 'id'
export type TypeNotificationsId = TypeNotifications[TypeNotificationsPk]
export type TypeNotificationsOptionalAttributes =
    | 'id'
    | 'createdAt'
    | 'updatedAt'
export type TypeNotificationsCreationAttributes = Optional<
    ,
    TypeNotificationsOptionalAttributes
>

export class TypeNotifications
    extends Model<TypeNotificationsAttributes, TypeNotificationsCreationAttributes>
    implements TypeNotificationsAttributes
{
    declare id: number
    declare read?: string
    declare readCoverPath?: string
    declare readTitle?: string
    declare difficulty?: string
    declare readSummary?: string
    declare question?: string
    declare answer?: string
    declare memorama_tematic?: string
    declare memorama_img?: string
    declare puzzle_name?: string
    declare puzzle?: string
    declare createdAt: Date
    declare updatedAt: Date

    // TypeNotifications hasMany Answers via exerciseId
    declare answers: Answers[]
    declare getAnswers: Sequelize.HasManyGetAssociationsMixin<Answers>
    declare setAnswers: Sequelize.HasManySetAssociationsMixin<
        Answers,
        AnswersId
    >
    declare addAnswer: Sequelize.HasManyAddAssociationMixin<Answers, AnswersId>
    declare addAnswers: Sequelize.HasManyAddAssociationsMixin<
        Answers,
        AnswersId
    >
    declare createAnswer: Sequelize.HasManyCreateAssociationMixin<Answers>
    declare removeAnswer: Sequelize.HasManyRemoveAssociationMixin<
        Answers,
        AnswersId
    >
    declare removeAnswers: Sequelize.HasManyRemoveAssociationsMixin<
        Answers,
        AnswersId
    >
    declare hasAnswer: Sequelize.HasManyHasAssociationMixin<Answers, AnswersId>
    declare hasAnswers: Sequelize.HasManyHasAssociationsMixin<
        Answers,
        AnswersId
    >

    declare countAnswers: Sequelize.HasManyCountAssociationsMixin
    // TypeNotifications hasMany CompleteTypeNotifications via exerciseId
    declare complete_exercises: CompleteTypeNotifications[]
    declare getComplete_exercises: Sequelize.HasManyGetAssociationsMixin<CompleteTypeNotifications>
    declare setComplete_exercises: Sequelize.HasManySetAssociationsMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare addComplete_exercise: Sequelize.HasManyAddAssociationMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare addComplete_exercises: Sequelize.HasManyAddAssociationsMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare createComplete_exercise: Sequelize.HasManyCreateAssociationMixin<CompleteTypeNotifications>
    declare removeComplete_exercise: Sequelize.HasManyRemoveAssociationMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare removeComplete_exercises: Sequelize.HasManyRemoveAssociationsMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare hasComplete_exercis: Sequelize.HasManyHasAssociationMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare hasComplete_exercises: Sequelize.HasManyHasAssociationsMixin<
        CompleteTypeNotifications,
        CompleteTypeNotificationsId
    >
    declare countComplete_exercises: Sequelize.HasManyCountAssociationsMixin

    // TypeNotifications hasMany Questions svia exerciseId
    declare questions: Question[]
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

    static initModel(sequelize: Sequelize.Sequelize): typeof TypeNotifications {
        return TypeNotifications.init(
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
