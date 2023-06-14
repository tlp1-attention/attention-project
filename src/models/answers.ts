import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';

export interface AnswersAttributes {
  id: number;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  exerciseId?: number;
}

export type AnswersPk = "id";
export type AnswersId = Answers[AnswersPk];
export type AnswersOptionalAttributes = "id" | "createdAt" | "updatedAt" | "exerciseId";
export type AnswersCreationAttributes = Optional<AnswersAttributes, AnswersOptionalAttributes>;

export class Answers extends Model<AnswersAttributes, AnswersCreationAttributes> implements AnswersAttributes {
  declare id: number;
  declare answer: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare exerciseId?: number;

  // Answers belongsTo Exercises via exerciseId
  exercise!: Exercises;
  getExercise!: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  setExercise!: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  createExercise!: Sequelize.BelongsToCreateAssociationMixin<Exercises>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Answers {
    return Answers.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'exercises',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'answers',
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
