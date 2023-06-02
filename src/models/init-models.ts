import type { Sequelize } from "sequelize";
import { usuario as _usuario } from "./usuario";
import type { usuarioAttributes, usuarioCreationAttributes } from "./usuario";

export {
  _usuario as usuario,
};

export type {
  usuarioAttributes,
  usuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const usuario = _usuario.initModel(sequelize);


  return {
    usuario: usuario,
  };
}
