import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CompleteExercises, CompleteExercisesId } from './complete_exercises';
import type { Users, UsersId } from './users';

export interface ReportsAttributes {
  id: number;
  completes: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}

export type ReportsPk = "id";
export type ReportsId = Reports[ReportsPk];
export type ReportsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "userId";
export type ReportsCreationAttributes = Optional<ReportsAttributes, ReportsOptionalAttributes>;

export class Reports extends Model<ReportsAttributes, ReportsCreationAttributes> implements ReportsAttributes {
  id!: number;
  completes!: number;
  createdAt!: Date;
  updatedAt!: Date;
  userId?: number;

  // Reports hasMany CompleteExercises via reportId
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
  // Reports belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Reports {
    return Reports.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    completes: {
      type: DataTypes.FLOAT,
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
    tableName: 'reports',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
