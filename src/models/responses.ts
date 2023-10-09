import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';

export interface ResponsesAttributes {
  id: number;
  response: string;
  correct: boolean;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
}

export type ResponsesPk = "id";
export type ResponsesId = Responses[ResponsesPk];
export type ResponsesOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type ResponsesCreationAttributes = Optional<ResponsesAttributes, ResponsesOptionalAttributes>;

export class Responses extends Model<ResponsesAttributes, ResponsesCreationAttributes> implements ResponsesAttributes {
  declare id: number;
  declare response: string;
  declare correct: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare questionId: number;
 
  // Responses belongsTo Question via questionId
  declare question: Exercises;
  declare getQuestion: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  declare setQuestion: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  declare createQuestion: Sequelize.BelongsToCreateAssociationMixin<Exercises>;

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
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
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
        name: "questionId",
        using: "BTREE",
        fields: [
          { name: "questionId" },
        ]
      },
    ]
  });
  }
}
