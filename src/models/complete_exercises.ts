import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';
import type { Reports, ReportsId } from './reports';
import { TypeExercises, TypeExercisesId } from './type_exercises';
import { Users, UsersId } from './users';

export interface CompleteExercisesAttributes {
  id: number;
  complete: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
  typeExerciseId?: number;
  exerciseId?: number;
}

export type CompleteExercisesPk = "id";
export type CompleteExercisesId = CompleteExercises[CompleteExercisesPk];
export type CompleteExercisesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "userId" | "typeExerciseId" | "exerciseId";
export type CompleteExercisesCreationAttributes = Optional<CompleteExercisesAttributes, CompleteExercisesOptionalAttributes>;

export class CompleteExercises extends Model<CompleteExercisesAttributes, CompleteExercisesCreationAttributes> implements CompleteExercisesAttributes {
  declare id: number;
  declare complete: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare reportId: number;
  declare typeExerciseId: number;
  declare exerciseId: number;

  // CompleteExercises belongsTo Exercises via exerciseId
  declare exercise: Exercises;
  declare getExercise: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  declare setExercise: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  declare createExercise: Sequelize.BelongsToCreateAssociationMixin<Exercises>;
  // CompleteExercises belongsTo Users via userId
  declare user: Users;
  declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
  declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;
  // CompleteExercises belongsTo TypeExercises via typeExerciseId
  declare typeExercise: TypeExercises;
  declare getTypeExercise: Sequelize.BelongsToGetAssociationMixin<TypeExercises>;
  declare setTypeExercise: Sequelize.BelongsToSetAssociationMixin<TypeExercises, TypeExercisesId>;
  declare createTypeExercise: Sequelize.BelongsToCreateAssociationMixin<TypeExercises>;


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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
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
          { name: "userId" },
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
