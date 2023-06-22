import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';

export interface TypeEventAttributes {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TypeEventPk = "id";
export type TypeEventId = TypeEvent[TypeEventPk];
export type TypeEventOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type TypeEventCreationAttributes = Optional<TypeEventAttributes, TypeEventOptionalAttributes>;

export class TypeEvent extends Model<TypeEventAttributes, TypeEventCreationAttributes> implements TypeEventAttributes {
  declare id: number;
  declare description: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Events belongsTo Exercises via exerciseId
  exercise!: Exercises;
  getExercise!: Sequelize.BelongsToGetAssociationMixin<Exercises>;
  setExercise!: Sequelize.BelongsToSetAssociationMixin<Exercises, ExercisesId>;
  createExercise!: Sequelize.BelongsToCreateAssociationMixin<Exercises>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TypeEvent {
    return TypeEvent.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'type_events',
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

