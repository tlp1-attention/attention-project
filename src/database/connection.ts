import { Sequelize } from 'sequelize'
import envConfig from '../config/env';

const { DB } = envConfig;

let sequelize: Sequelize;
if (!DB.URL) {
  sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
      host: DB.HOST,
      dialect: DB.DIALECT,
  });
} else {
  sequelize = new Sequelize(DB.URL);
}

export { sequelize }