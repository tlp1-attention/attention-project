import { Sequelize } from 'sequelize'
import { initModels } from './models/init-models';
import dotenv from 'dotenv'

dotenv.config()

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD, 
    DB_NAME,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    password: DB_PASSWORD,
    database: DB_NAME,
    username: DB_USERNAME
});

const Models = initModels(sequelize);

const { Users, Reports, TypeExercises, Exercises, CompleteExercises, Preferences, Answers, Responses, Events, TypeEvent } = Models;

Answers.belongsTo(Exercises, { as: "exercise", foreignKey: "exerciseId"});
Exercises.hasMany(Answers, { as: "answers", foreignKey: "exerciseId"});
CompleteExercises.belongsTo(Exercises, { as: "exercise", foreignKey: "exerciseId"});
Exercises.hasMany(CompleteExercises, { as: "complete_exercises", foreignKey: "exerciseId"});
Responses.belongsTo(Exercises, { as: "exercise", foreignKey: "exerciseId"});
Exercises.hasMany(Responses, { as: "responses", foreignKey: "exerciseId"});
CompleteExercises.belongsTo(Reports, { as: "report", foreignKey: "reportId"});
Reports.hasMany(CompleteExercises, { as: "complete_exercises", foreignKey: "reportId"});
CompleteExercises.belongsTo(TypeExercises, { as: "typeExercise", foreignKey: "typeExerciseId"});
TypeExercises.hasMany(CompleteExercises, { as: "complete_exercises", foreignKey: "typeExerciseId"});
Preferences.belongsTo(Users, { as: "user", foreignKey: "userId"});
Users.hasMany(Preferences, { as: "preferences", foreignKey: "userId"});
Reports.belongsTo(Users, { as: "user", foreignKey: "userId"});
Users.hasMany(Reports, { as: "reports", foreignKey: "userId"});

Events.belongsTo(Users, { as: "users", foreignKey: 'userId'});
Users.hasMany(Events, { as: "events", foreignKey: 'userId' });
Events.belongsTo(TypeEvent, { as: 'typeEvents', foreignKey: 'typeId'});
TypeEvent.hasMany(Events, { as: 'events', foreignKey: 'typeId' });



export {
    sequelize,
    Models
};

