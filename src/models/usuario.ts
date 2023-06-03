import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usuarioAttributes {
  id_usuario: number;
  nombre_usuario: string;
  contrasenia: string;
  correo_electronico: string;
}

export type usuarioPk = "id_usuario";
export type usuarioId = usuario[usuarioPk];
export type usuarioCreationAttributes = usuarioAttributes;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  declare id_usuario: number;
  declare nombre_usuario: string;
  declare contrasenia: string;
  declare correo_electronico: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}
