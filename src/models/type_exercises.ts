import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CompleteExercises, CompleteExercisesId } from './complete_exercises';

export interface TypeExercisesAttributes {
  id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TypeExercisesPk = "id";
export type TypeExercisesId = TypeExercises[TypeExercisesPk];
export type TypeExercisesOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type TypeExercisesCreationAttributes = Optional<TypeExercisesAttributes, TypeExercisesOptionalAttributes>;

export class TypeExercises extends Model<TypeExercisesAttributes, TypeExercisesCreationAttributes> implements TypeExercisesAttributes {
  id!: number;
  type!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // TypeExercises hasMany CompleteExercises via typeExerciseId
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


  /**
   * Static method that find the of available
   * types for exercises
   * 
   * @returns {number[]} An array of valid TypeExercise's ID
   */
  static async typesAvailable(): Promise<number[]> {
    const types = await TypeExercises.findAll();
    return types.map(t => t.id);
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof TypeExercises {
    return TypeExercises.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'type_exercises',
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
