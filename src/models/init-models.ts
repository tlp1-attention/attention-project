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
import { Events as _Events } from './events'
import type { EventsAttributes, EventsCreationAttributes } from "./events";
import type { TypeEventAttributes, TypeEventCreationAttributes } from "./type_events";
import { TypeEvent as _TypeEvent } from "./type_events";
import { Question as _Question } from "./questions";
import type { QuestionAttributes, QuestionCreationAttributes } from "./questions";
import type { NotificationsAttributes, NotificationCreationAttributes  } from "./notifications";
import { Notifications as _Notifications } from "./notifications";
import type { TypeNotificationsAttributes, TypeNotificationsCreationAttributes } from "./type-notifications";
import { TypeNotifications as _TypeNotifications } from "./type-notifications";

export {
  _Answers as Answers,
  _CompleteExercises as CompleteExercises,
  _Exercises as Exercises,
  _Preferences as Preferences,
  _Reports as Reports,
  _Responses as Responses,
  _TypeExercises as TypeExercises,
  _Users as Users,
  _TypeEvent as TypeEvent,
  _Question as Question,
  _Notifications as Notifications,
  _TypeNotifications as TypeNotifications
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
  EventsAttributes,
  EventsCreationAttributes,
  TypeEventAttributes,
  TypeEventCreationAttributes,
  QuestionAttributes,
  QuestionCreationAttributes,
  NotificationsAttributes,
  NotificationCreationAttributes,
  TypeNotificationsAttributes,
  TypeNotificationsCreationAttributes
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
  const TypeEvent = _TypeEvent.initModel(sequelize);
  const Events = _Events.initModel(sequelize);
  const Question = _Question.initModel(sequelize);
  const Notifications = _Notifications.initModel(sequelize);
  const TypeNotifications = _TypeNotifications.initModel(sequelize);

  return {
    Answers: Answers,
    CompleteExercises: CompleteExercises,
    Exercises: Exercises,
    Preferences: Preferences,
    Reports: Reports,
    Responses: Responses,
    TypeExercises: TypeExercises,
    Users: Users,
    Events: Events,
    TypeEvent: TypeEvent,
    Question: Question,
    Notifications: Notifications,
    TypeNotifications: TypeNotifications
  };
}
