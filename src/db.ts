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

const { Users, Reports, TypeExercises, Exercises, CompleteExercises, Preferences, Answers, Responses } = Models;

Users.hasOne(Preferences);
Users.hasMany(Reports);
Reports.hasMany(CompleteExercises);
TypeExercises.hasMany(CompleteExercises);
Exercises.hasMany(CompleteExercises);
Exercises.hasMany(Answers);
Exercises.hasMany(Responses);

export {
    sequelize,
    Models
};

