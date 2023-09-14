import { Sequelize } from 'sequelize'
import { initModels } from './models/init-models';
import dotenv from 'dotenv'

dotenv.config()
const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD, 
    DB_NAME,
    DB_URL
} = process.env;

let sequelize: Sequelize;
if (!DB_URL) {
  sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'mysql',
      password: DB_PASSWORD,
      database: DB_NAME,
      username: DB_USERNAME
  });
} else {
  sequelize = new Sequelize(DB_URL);
}

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

Events.belongsTo(Users, { foreignKey: 'userId'});
Users.hasMany(Events, { foreignKey: 'userId' });
Events.belongsTo(TypeEvent, { as: 'type', foreignKey: 'typeId'});
TypeEvent.hasMany(Events, { as: 'event', foreignKey: 'typeId' });

// Automatically create events types if not present in the database
TypeEvent.findOrCreate({
    where: {
      id: 1,
      description: 'IMPORTANT'
    }
  });
  TypeEvent.findOrCreate({
    where: {
      id: 2,
      description: 'NOT IMPORTANT'
    }
});

export {
    sequelize,
    Models
};

