import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Answers, AnswersId } from './answers'
import type {
    CompleteExercises,
    CompleteExercisesId,
} from './complete_exercises'
import { Question, QuestionId } from './questions'

export interface ExercisesAttributes {
    id: number
    read?: string
    questionId?: number
    readCoverPath?: string
    difficulty?: string
    readSummary?: string
    readTitle?: string
    answer?: string
    memorama_tematic?: string
    memorama_img?: string
    puzzle_name?: string
    puzzle?: string
    createdAt: Date
    updatedAt: Date
}

const DIFFICULTIES = {
    EASY: 'Fácil',
    MEDIUM: 'Medio',
    EXPERT: 'Expert',
}

export type ExercisesPk = 'id'
export type ExercisesId = Exercises[ExercisesPk]
export type ExercisesOptionalAttributes =
    | 'id'
    | 'read'
    | 'readCoverPath'
    | 'readSummary'
    | 'readTitle'
    | 'questionId'
    | 'answer'
    | 'memorama_tematic'
    | 'memorama_img'
    | 'puzzle_name'
    | 'puzzle'
    | 'createdAt'
    | 'updatedAt'
export type ExercisesCreationAttributes = Optional<
    ExercisesAttributes,
    ExercisesOptionalAttributes
>

export class Exercises
    extends Model<ExercisesAttributes, ExercisesCreationAttributes>
    implements ExercisesAttributes
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

    // Exercises hasMany Answers via exerciseId
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
    // Exercises hasMany CompleteExercises via exerciseId
    declare complete_exercises: CompleteExercises[]
    declare getComplete_exercises: Sequelize.HasManyGetAssociationsMixin<CompleteExercises>
    declare setComplete_exercises: Sequelize.HasManySetAssociationsMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare addComplete_exercise: Sequelize.HasManyAddAssociationMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare addComplete_exercises: Sequelize.HasManyAddAssociationsMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare createComplete_exercise: Sequelize.HasManyCreateAssociationMixin<CompleteExercises>
    declare removeComplete_exercise: Sequelize.HasManyRemoveAssociationMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare removeComplete_exercises: Sequelize.HasManyRemoveAssociationsMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare hasComplete_exercis: Sequelize.HasManyHasAssociationMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare hasComplete_exercises: Sequelize.HasManyHasAssociationsMixin<
        CompleteExercises,
        CompleteExercisesId
    >
    declare countComplete_exercises: Sequelize.HasManyCountAssociationsMixin

    // Exercises hasMany Questions svia exerciseId
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

    static initModel(sequelize: Sequelize.Sequelize): typeof Exercises {
        return Exercises.init(
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
