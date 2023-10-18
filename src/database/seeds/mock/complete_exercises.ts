import env from "../../../config/env"
import { CompleteExercises } from "../../../models/complete_exercises"
import { createDatesByWeek } from "../../../utils/createDatesByWeek"

export async function createCompleteExercise(quantity: number, userId: number) {
    if (env.NODE_ENV.startsWith('prod')) {
        throw new Error('Should not create mock events in Production.')
    }

    const now = new Date()

    const weekDates = createDatesByWeek(now, quantity)

    for (const date of weekDates) {
        for (let times = 0; times < 5; times++) {
            await CompleteExercises.findOrCreate({
                where: {
                    userId,
                    createdAt: date,
                    typeExerciseId: 1,
                    exerciseId: 16,
                    complete: Math.random() > 0.5
                }
            });
            if (Math.random() < 0.8) continue;
        }
    }

    console.log('Creados ejercicos completos de prueba satisfactoriamente')
}
