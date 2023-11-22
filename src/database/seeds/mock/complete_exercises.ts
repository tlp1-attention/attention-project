import env from '../../../config/env'
import { CompleteExercises } from '../../../models/complete_exercises'
import { createDatesByWeek } from '../../../utils/create-dates-by-week'

export async function createCompleteExercise(quantity: number, userId: number) {
    if (env.NODE_ENV.startsWith('prod')) {
        throw new Error('Should not create mock events in Production.')
    }

    const now = new Date()

    const weekDates = createDatesByWeek(now, quantity)

    for (const date of weekDates) {
        Array.from({ length: Math.ceil(Math.random() * 10) }).forEach(
            async (e, i) =>
                await CompleteExercises.findOrCreate({
                    where: {
                        userId,
                        createdAt: date,
                        typeExerciseId: 1,
                        exerciseId: 2,
                        complete: Math.random() > 0.5,
                    },
                })
        )
    }

    console.log('Creados ejercicos completos de prueba satisfactoriamente')
}
