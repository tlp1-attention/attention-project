import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Responses, ResponsesId } from './responses';
import { Exercises, ExercisesId } from './exercises';

export interface QuestionAttributes {
  id: number;
  text: string;
  exerciseId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionPk = "id";
export type QuestionId = Question[QuestionPk];
export type QuestionOptionalAttributes = "id" | "updatedAt";
export type QuestionCreationAttributes = Optional<QuestionAttributes, QuestionOptionalAttributes>;

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  declare id: number;
  declare text: string;
  declare exerciseId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Exercises hasMany Responses via exerciseId
  declare responses: Responses[];
  declare getResponses: Sequelize.HasManyGetAssociationsMixin<Responses>;
  declare setResponses: Sequelize.HasManySetAssociationsMixin<Responses, ResponsesId>;
  declare addResponse: Sequelize.HasManyAddAssociationMixin<Responses, ResponsesId>;
  declare addResponses: Sequelize.HasManyAddAssociationsMixin<Responses, ResponsesId>;
  declare createResponse: Sequelize.HasManyCreateAssociationMixin<Responses>;
  declare removeResponse: Sequelize.HasManyRemoveAssociationMixin<Responses, ResponsesId>;
  declare removeResponses: Sequelize.HasManyRemoveAssociationsMixin<Responses, ResponsesId>;
  declare hasResponse: Sequelize.HasManyHasAssociationMixin<Responses, ResponsesId>;
  declare hasResponses: Sequelize.HasManyHasAssociationsMixin<Responses, ResponsesId>;
  declare countResponses: Sequelize.HasManyCountAssociationsMixin;

  // Question belongsTo an Exercise via exerciseId
  exercise!: Exercises;
  getExercise!: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  setExercise!: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  createExercise!: Sequelize.BelongsToCreateAssociationMixin<Exercises>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Question {
    return Question.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(255),
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: Exercises
      }
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
    tableName: 'questions',
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
