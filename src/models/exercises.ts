import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Answers, AnswersId } from './answers';
import type { CompleteExercises, CompleteExercisesId } from './complete_exercises';
import type { Responses, ResponsesId } from './responses';

export interface ExercisesAttributes {
  id: number;
  read?: string;
  question?: string;
  answer?: string;
  memorama_tematic?: string;
  memorama_img?: string;
  puzzle_name?: string;
  puzzle?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ExercisesPk = "id";
export type ExercisesId = Exercises[ExercisesPk];
export type ExercisesOptionalAttributes = "id" | "read" | "question" | "answer" | "memorama_tematic" | "memorama_img" | "puzzle_name" | "puzzle" | "createdAt" | "updatedAt";
export type ExercisesCreationAttributes = Optional<ExercisesAttributes, ExercisesOptionalAttributes>;

export class Exercises extends Model<ExercisesAttributes, ExercisesCreationAttributes> implements ExercisesAttributes {
  id!: number;
  read?: string;
  question?: string;
  answer?: string;
  memorama_tematic?: string;
  memorama_img?: string;
  puzzle_name?: string;
  puzzle?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Exercises hasMany Answers via exerciseId
  answers!: Answers[];
  getAnswers!: Sequelize.HasManyGetAssociationsMixin<Answers>;
  setAnswers!: Sequelize.HasManySetAssociationsMixin<Answers, AnswersId>;
  addAnswer!: Sequelize.HasManyAddAssociationMixin<Answers, AnswersId>;
  addAnswers!: Sequelize.HasManyAddAssociationsMixin<Answers, AnswersId>;
  createAnswer!: Sequelize.HasManyCreateAssociationMixin<Answers>;
  removeAnswer!: Sequelize.HasManyRemoveAssociationMixin<Answers, AnswersId>;
  removeAnswers!: Sequelize.HasManyRemoveAssociationsMixin<Answers, AnswersId>;
  hasAnswer!: Sequelize.HasManyHasAssociationMixin<Answers, AnswersId>;
  hasAnswers!: Sequelize.HasManyHasAssociationsMixin<Answers, AnswersId>;
  countAnswers!: Sequelize.HasManyCountAssociationsMixin;
  // Exercises hasMany CompleteExercises via exerciseId
  complete_exercises!: CompleteExercises[];
  getComplete_exercises!: Sequelize.HasManyGetAssociationsMixin<CompleteExercises>;
  setComplete_exercises!: Sequelize.HasManySetAssociationsMixin<CompleteExercises, CompleteExercisesId>;
  addComplete_exercise!: Sequelize.HasManyAddAssociationMixin<CompleteExercises, CompleteExercisesId>;
  addComplete_exercises!: Sequelize.HasManyAddAssociationsMixin<CompleteExercises, CompleteExercisesId>;
  createComplete_exercise!: Sequelize.HasManyCreateAssociationMixin<CompleteExercises>;
  removeComplete_exercise!: Sequelize.HasManyRemoveAssociationMixin<CompleteExercises, CompleteExercisesId>;
  removeComplete_exercises!: Sequelize.HasManyRemoveAssociationsMixin<CompleteExercises, CompleteExercisesId>;
  hasComplete_exercise!: Sequelize.HasManyHasAssociationMixin<CompleteExercises, CompleteExercisesId>;
  hasComplete_exercises!: Sequelize.HasManyHasAssociationsMixin<CompleteExercises, CompleteExercisesId>;
  countComplete_exercises!: Sequelize.HasManyCountAssociationsMixin;
  // Exercises hasMany Responses via exerciseId
  responses!: Responses[];
  getResponses!: Sequelize.HasManyGetAssociationsMixin<Responses>;
  setResponses!: Sequelize.HasManySetAssociationsMixin<Responses, ResponsesId>;
  addResponse!: Sequelize.HasManyAddAssociationMixin<Responses, ResponsesId>;
  addResponses!: Sequelize.HasManyAddAssociationsMixin<Responses, ResponsesId>;
  createResponse!: Sequelize.HasManyCreateAssociationMixin<Responses>;
  removeResponse!: Sequelize.HasManyRemoveAssociationMixin<Responses, ResponsesId>;
  removeResponses!: Sequelize.HasManyRemoveAssociationsMixin<Responses, ResponsesId>;
  hasResponse!: Sequelize.HasManyHasAssociationMixin<Responses, ResponsesId>;
  hasResponses!: Sequelize.HasManyHasAssociationsMixin<Responses, ResponsesId>;
  countResponses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Exercises {
    return Exercises.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    read: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    question: {
      type: DataTypes.STRING(255),  
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    memorama_tematic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    memorama_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    puzzle_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    puzzle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'exercises',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
