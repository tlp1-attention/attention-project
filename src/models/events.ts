import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises, ExercisesId } from './exercises';
import { Users } from './users';
import type { UsersId } from './users';

export interface EventsAttributes {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  startTime: Date;
  endTime: Date;
  userId: number;
  typeId: number;
}

export type EventsPk = "id";
export type EventsId = Events[EventsPk];
export type EventsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "userId";
export type EventsCreationAttributes = Optional<EventsAttributes, EventsOptionalAttributes>;

export class Events extends Model<EventsAttributes, EventsCreationAttributes> implements EventsAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare typeId: number;
  declare startTime: Date;
  declare endTime: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare userId: number;

  // Events belongsTo User via userId
  user!: Exercises;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Events {
    return Events.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'type_events',
            key: 'id'
        }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'events',
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
      {
        name: "typeId",
        using: "BTREE",
        fields: [
          { name: "typeId" },
        ]
      }
    ]
  });
  }
}

