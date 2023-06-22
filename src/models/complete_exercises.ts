import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';
import type { Reports, ReportsId } from './reports';
import type { TypeExercises, TypeExercisesId } from './type_exercises';

export interface CompleteExercisesAttributes {
  id: number;
  complete: number;
  createdAt: Date;
  updatedAt: Date;
  reportId?: number;
  typeExerciseId?: number;
  exerciseId?: number;
}

export type CompleteExercisesPk = "id";
export type CompleteExercisesId = CompleteExercises[CompleteExercisesPk];
export type CompleteExercisesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "reportId" | "typeExerciseId" | "exerciseId";
export type CompleteExercisesCreationAttributes = Optional<CompleteExercisesAttributes, CompleteExercisesOptionalAttributes>;

export class CompleteExercises extends Model<CompleteExercisesAttributes, CompleteExercisesCreationAttributes> implements CompleteExercisesAttributes {
  id!: number;
  complete!: number;
  createdAt!: Date;
  updatedAt!: Date;
  reportId?: number;
  typeExerciseId?: number;
  exerciseId?: number;

  // CompleteExercises belongsTo Exercises via exerciseId
  exercise!: Exercises;
  getExercise!: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  setExercise!: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  createExercise!: Sequelize.BelongsToCreateAssociationMixin<Exercises>;
  // CompleteExercises belongsTo Reports via reportId
  report!: Reports;
  getReport!: Sequelize.BelongsToGetAssociationMixin<Reports>;
  setReport!: Sequelize.BelongsToSetAssociationMixin<Reports, ReportsId>;
  createReport!: Sequelize.BelongsToCreateAssociationMixin<Reports>;
  // CompleteExercises belongsTo TypeExercises via typeExerciseId
  typeExercise!: TypeExercises;
  getTypeExercise!: Sequelize.BelongsToGetAssociationMixin<TypeExercises>;
  setTypeExercise!: Sequelize.BelongsToSetAssociationMixin<TypeExercises, TypeExercisesId>;
  createTypeExercise!: Sequelize.BelongsToCreateAssociationMixin<TypeExercises>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CompleteExercises {
    return CompleteExercises.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'reports',
        key: 'id'
      }
    },
    typeExerciseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'type_exercises',
        key: 'id'
      }
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
    tableName: 'complete_exercises',
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
        name: "reportId",
        using: "BTREE",
        fields: [
          { name: "reportId" },
        ]
      },
      {
        name: "typeExerciseId",
        using: "BTREE",
        fields: [
          { name: "typeExerciseId" },
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
