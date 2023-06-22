import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';

export interface ResponsesAttributes {
  id: number;
  response: string;
  correct: number;
  createdAt: Date;
  updatedAt: Date;
  exerciseId?: number;
}

export type ResponsesPk = "id";
export type ResponsesId = Responses[ResponsesPk];
export type ResponsesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "exerciseId";
export type ResponsesCreationAttributes = Optional<ResponsesAttributes, ResponsesOptionalAttributes>;

export class Responses extends Model<ResponsesAttributes, ResponsesCreationAttributes> implements ResponsesAttributes {
  id!: number;
  response!: string;
  correct!: number;
  createdAt!: Date;
  updatedAt!: Date;
  exerciseId?: number;

  // Responses belongsTo Exercises via exerciseId
  exercise!: Exercises;
  getExercise!: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  setExercise!: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  createExercise!: Sequelize.BelongsToCreateAssociationMixin<Exercises>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Responses {
    return Responses.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    response: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    correct: {
      type: DataTypes.BOOLEAN,
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
      allowNull: false,
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'responses',
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
      {
        name: "exerciseId",
        using: "BTREE",
        fields: [
          { name: "exerciseId" },
        ]
      },
    ]
  });
  }
}
