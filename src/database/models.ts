import { initModels } from '../models/init-models'
import { sequelize } from './connection'

const Models = initModels(sequelize)

const {
    Users,
    Reports,
    TypeExercises,
    Exercises,
    CompleteExercises,
    Preferences,
    Answers,
    Responses,
    Events,
    TypeEvent,
    Question
} = Models

Answers.belongsTo(Exercises, { as: 'exercise', foreignKey: 'exerciseId' })
Exercises.hasMany(Answers, { as: 'answers', foreignKey: 'exerciseId' })
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
    as: 'question',
    foreignKey: 'questionId'
});
CompleteExercises.belongsTo(Reports, { as: 'report', foreignKey: 'reportId' })
Reports.hasMany(CompleteExercises, {
    as: 'complete_exercises',
    foreignKey: 'reportId',
})
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

export { Models };