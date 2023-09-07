import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Exercises } from './exercises';
import { Users } from './users';
import type { UsersId } from './users';
import { TypeEvent, TypeEventId } from './type_events';

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
  completed: boolean;
  remindedAt: Date;
}

export type EventsPk = "id";
export type EventsId = Events[EventsPk];
export type EventsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "userId" | "remindedAt" | "completed";
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
  declare remindedAt: Date;
  declare completed: boolean;

  // Events belongsTo User via userId
  declare user: Exercises;
  declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
  declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

  // Events belongsTo TypeEvent via typeId
  declare type: TypeEvent;
  declare getType: Sequelize.BelongsToGetAssociationMixin<TypeEvent>;
  declare setTypeEvent: Sequelize.BelongsToSetAssociationMixin<TypeEvent, TypeEventId>;
  declare createTypeEvent: Sequelize.BelongsToCreateAssociationMixin<TypeEvent>;


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
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    },
    remindedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
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

