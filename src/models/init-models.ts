import type { Sequelize } from "sequelize";
import { Answers as _Answers } from "./answers";
import type { AnswersAttributes, AnswersCreationAttributes } from "./answers";
import { CompleteExercises as _CompleteExercises } from "./complete_exercises";
import type { CompleteExercisesAttributes, CompleteExercisesCreationAttributes } from "./complete_exercises";
import { Exercises as _Exercises } from "./exercises";
import type { ExercisesAttributes, ExercisesCreationAttributes } from "./exercises";
import { Preferences as _Preferences } from "./preferences";
import type { PreferencesAttributes, PreferencesCreationAttributes } from "./preferences";
import { Reports as _Reports } from "./reports";
import type { ReportsAttributes, ReportsCreationAttributes } from "./reports";
import { Responses as _Responses } from "./responses";
import type { ResponsesAttributes, ResponsesCreationAttributes } from "./responses";
import { TypeExercises as _TypeExercises } from "./type_exercises";
import type { TypeExercisesAttributes, TypeExercisesCreationAttributes } from "./type_exercises";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Answers as Answers,
  _CompleteExercises as CompleteExercises,
  _Exercises as Exercises,
  _Preferences as Preferences,
  _Reports as Reports,
  _Responses as Responses,
  _TypeExercises as TypeExercises,
  _Users as Users,
};

export type {
  AnswersAttributes,
  AnswersCreationAttributes,
  CompleteExercisesAttributes,
  CompleteExercisesCreationAttributes,
  ExercisesAttributes,
  ExercisesCreationAttributes,
  PreferencesAttributes,
  PreferencesCreationAttributes,
  ReportsAttributes,
  ReportsCreationAttributes,
  ResponsesAttributes,
  ResponsesCreationAttributes,
  TypeExercisesAttributes,
  TypeExercisesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Answers = _Answers.initModel(sequelize);
  const CompleteExercises = _CompleteExercises.initModel(sequelize);
  const Exercises = _Exercises.initModel(sequelize);
  const Preferences = _Preferences.initModel(sequelize);
  const Reports = _Reports.initModel(sequelize);
  const Responses = _Responses.initModel(sequelize);
  const TypeExercises = _TypeExercises.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

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

  return {
    Answers: Answers,
    CompleteExercises: CompleteExercises,
    Exercises: Exercises,
    Preferences: Preferences,
    Reports: Reports,
    Responses: Responses,
    TypeExercises: TypeExercises,
    Users: Users,
  };
}
