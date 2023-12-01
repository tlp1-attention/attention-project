import { FederatedCredentials, initModels } from '../models/init-models'
import { sequelize } from './connection'

const Models = initModels(sequelize)

const {
    Users,
    Reports,
    TypeExercises,
    Exercises,
    CompleteExercises,
    Preferences,
    Responses,
    Events,
    TypeEvent,
    Question,
    Notifications,
    TypeNotifications,
} = Models

Exercises.hasMany(Question, { as: 'question', foreignKey: 'exerciseId' })
Question.belongsTo(Exercises, { as: 'exercise', foreignKey: 'exerciseId' })
CompleteExercises.belongsTo(Exercises, {
    as: 'exercise',
    foreignKey: 'exerciseId',
})
Exercises.hasMany(CompleteExercises, {
    as: 'complete_exercises',
    foreignKey: 'exerciseId',
})
Responses.belongsTo(Question, {
    as: 'question',
    foreignKey: 'questionId'
});
Question.hasMany(Responses, {
    as: 'response',
    foreignKey: 'questionId'
});
CompleteExercises.belongsTo(Users, { as: 'users', foreignKey: 'userId' })
Users.hasMany(CompleteExercises, { as: 'complete_exercises', foreignKey: 'userId' })
CompleteExercises.belongsTo(TypeExercises, {
    as: 'typeExercise',
    foreignKey: 'typeExerciseId',
})
TypeExercises.hasMany(CompleteExercises, {
    as: 'complete_exercises',
    foreignKey: 'typeExerciseId',
})
Preferences.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
Users.hasMany(Preferences, { as: 'preferences', foreignKey: 'userId' })
Reports.belongsTo(Users, { as: 'user', foreignKey: 'userId' })
Users.hasMany(Reports, { as: 'reports', foreignKey: 'userId' })

Events.belongsTo(Users, { foreignKey: 'userId' })
Users.hasMany(Events, { foreignKey: 'userId' })
Events.belongsTo(TypeEvent, { as: 'type', foreignKey: 'typeId' })
TypeEvent.hasMany(Events, { as: 'event', foreignKey: 'typeId' })

TypeNotifications.hasMany(Notifications, { foreignKey: 'typeId' });
Notifications.hasOne(TypeNotifications, { foreignKey: 'typeId' });

FederatedCredentials.hasOne(Users, { foreignKey: 'userId' });
Users.hasMany(FederatedCredentials, { foreignKey: 'userId' });
export { Models };