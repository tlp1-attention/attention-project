import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

  /**
   * Static method that find the of available
   * types for events
   * 
   * @returns {number[]} An array of valid TypeEvent's ID
   */
  static async typesAvailable(): Promise<number[]> {
    const types = await TypeEvent.findAll();
    return types.map(t => t.id);
  }


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
