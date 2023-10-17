import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface PreferencesAttributes {
  id: number;
  time_day: string;
  subject: string;
  people: string;
  contact_type: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}

export const TIME_DAY = {
  DAY: 'Día',
  AFTERNOON: 'Tarde',
  NIGHT: 'Noche'
}

export const CONTACT_TYPES = {
  DISCORD: 'discord',
  SLACK: 'slack',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone number'
}

export type PreferencesPk = "id";
export type PreferencesId = Preferences[PreferencesPk];
export type PreferencesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "userId";
export type PreferencesCreationAttributes = Optional<PreferencesAttributes, PreferencesOptionalAttributes>;

export class Preferences extends Model<PreferencesAttributes, PreferencesCreationAttributes> implements PreferencesAttributes {
  id!: number;
  time_day!: string;
  subject!: string;
  people!: string;
  contact_type!: string;
  contact!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId?: number;

  // Preferences belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Preferences {
    return Preferences.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time_day: {
      type: DataTypes.ENUM(
        TIME_DAY.DAY,
        TIME_DAY.AFTERNOON,
        TIME_DAY.NIGHT
      ),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    people: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact: {
      type: DataTypes.ENUM(
        CONTACT_TYPES.DISCORD,
        CONTACT_TYPES.SLACK,
        CONTACT_TYPES.EMAIL,
        CONTACT_TYPES.PHONE_NUMBER
      ),
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
    tableName: 'preferences',
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
