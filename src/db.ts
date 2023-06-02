import { Sequelize } from 'sequelize'
import { initModels } from './models/init-models';
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    password: DATABASE_PASSWORD,
    database: 'attention',
    username: 'root'
});

const Models = initModels(sequelize);

export {
    sequelize,
    Models
};

