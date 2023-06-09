import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Preferences, PreferencesId } from './preferences';
import type { Reports, ReportsId } from './reports';

export interface UsersAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  description?: string;
  ocupation?: string;
  problem: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "description" | "ocupation" | "createdAt" | "updatedAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare description?: string;
  declare ocupation?: string;
  declare problem: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Users hasMany Preferences via userId
  preferences!: Preferences[];
  getPreferences!: Sequelize.HasManyGetAssociationsMixin<Preferences>;
  setPreferences!: Sequelize.HasManySetAssociationsMixin<Preferences, PreferencesId>;
  addPreference!: Sequelize.HasManyAddAssociationMixin<Preferences, PreferencesId>;
  addPreferences!: Sequelize.HasManyAddAssociationsMixin<Preferences, PreferencesId>;
  createPreference!: Sequelize.HasManyCreateAssociationMixin<Preferences>;
  removePreference!: Sequelize.HasManyRemoveAssociationMixin<Preferences, PreferencesId>;
  removePreferences!: Sequelize.HasManyRemoveAssociationsMixin<Preferences, PreferencesId>;
  hasPreference!: Sequelize.HasManyHasAssociationMixin<Preferences, PreferencesId>;
  hasPreferences!: Sequelize.HasManyHasAssociationsMixin<Preferences, PreferencesId>;
  countPreferences!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Reports via userId
  reports!: Reports[];
  getReports!: Sequelize.HasManyGetAssociationsMixin<Reports>;
  setReports!: Sequelize.HasManySetAssociationsMixin<Reports, ReportsId>;
  addReport!: Sequelize.HasManyAddAssociationMixin<Reports, ReportsId>;
  addReports!: Sequelize.HasManyAddAssociationsMixin<Reports, ReportsId>;
  createReport!: Sequelize.HasManyCreateAssociationMixin<Reports>;
  removeReport!: Sequelize.HasManyRemoveAssociationMixin<Reports, ReportsId>;
  removeReports!: Sequelize.HasManyRemoveAssociationsMixin<Reports, ReportsId>;
  hasReport!: Sequelize.HasManyHasAssociationMixin<Reports, ReportsId>;
  hasReports!: Sequelize.HasManyHasAssociationsMixin<Reports, ReportsId>;
  countReports!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ocupation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    problem: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'users',
    timestamps: true,
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
