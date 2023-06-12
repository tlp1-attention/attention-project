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

const { Users, Reports, TypeExercises, Exercises, CompleteExercises, Preferences, Answers, Responses, Events } = Models;

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

export {
    sequelize,
    Models
};

