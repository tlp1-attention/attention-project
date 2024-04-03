import type { Sequelize } from "sequelize";
import type { AnswersAttributes, AnswersCreationAttributes } from "./answers";
import { Answers as _Answers } from "./answers";
import type { CompleteExercisesAttributes, CompleteExercisesCreationAttributes } from "./complete_exercises";
import { CompleteExercises as _CompleteExercises } from "./complete_exercises";
import type { EventsAttributes, EventsCreationAttributes } from "./events";
import { Events as _Events } from './events';
import type { ExercisesAttributes, ExercisesCreationAttributes } from "./exercises";
import { Exercises as _Exercises } from "./exercises";
import type { FederatedCredentialsAttributes, FederatedCredentialsCreationAttributes } from "./federated-credentials";
import { FederatedCredentials as _FederatedCredentials } from "./federated-credentials";
import type { NotificationCreationAttributes, NotificationsAttributes } from "./notifications";
import { Notifications as _Notifications } from "./notifications";
import type { PreferencesAttributes, PreferencesCreationAttributes } from "./preferences";
import { Preferences as _Preferences } from "./preferences";
import type { QuestionAttributes, QuestionCreationAttributes } from "./questions";
import { Question as _Question } from "./questions";
import type { ReportsAttributes, ReportsCreationAttributes } from "./reports";
import { Reports as _Reports } from "./reports";
import type { ResponsesAttributes, ResponsesCreationAttributes } from "./responses";
import { Responses as _Responses } from "./responses";
import { RolesAttributes, RolesCreationAttributes, Roles as _Roles } from './roles';
import type { TypeNotificationsAttributes, TypeNotificationsCreationAttributes } from "./type-notifications";
import { TypeNotifications as _TypeNotifications } from "./type-notifications";
import type { TypeEventAttributes, TypeEventCreationAttributes } from "./type_events";
import { TypeEvent as _TypeEvent } from "./type_events";
import type { TypeExercisesAttributes, TypeExercisesCreationAttributes } from "./type_exercises";
import { TypeExercises as _TypeExercises } from "./type_exercises";
import type { UsersAttributes, UsersCreationAttributes } from "./users";
import { Users as _Users } from "./users";

export {
  _Answers as Answers,
  _CompleteExercises as CompleteExercises,
  _Exercises as Exercises, _FederatedCredentials as FederatedCredentials, _Notifications as Notifications, _Preferences as Preferences, _Question as Question, _Reports as Reports,
  _Responses as Responses, _Roles as Roles, _TypeEvent as TypeEvent, _TypeExercises as TypeExercises, _TypeNotifications as TypeNotifications, _Users as Users
};

  export type {
    AnswersAttributes,
    AnswersCreationAttributes,
    CompleteExercisesAttributes,
    CompleteExercisesCreationAttributes, EventsAttributes,
    EventsCreationAttributes, ExercisesAttributes,
    ExercisesCreationAttributes, FederatedCredentialsAttributes,
    FederatedCredentialsCreationAttributes, NotificationCreationAttributes, NotificationsAttributes, PreferencesAttributes,
    PreferencesCreationAttributes, QuestionAttributes,
    QuestionCreationAttributes, ReportsAttributes,
    ReportsCreationAttributes,
    ResponsesAttributes,
    ResponsesCreationAttributes, RolesAttributes,
    RolesCreationAttributes, TypeEventAttributes,
    TypeEventCreationAttributes, TypeExercisesAttributes,
    TypeExercisesCreationAttributes, TypeNotificationsAttributes,
    TypeNotificationsCreationAttributes, UsersAttributes,
    UsersCreationAttributes
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
  const FederatedCredentials = _FederatedCredentials.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);

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
    TypeNotifications: TypeNotifications,
    FederatedCredentials: FederatedCredentials,
    Roles: Roles
  };
}
