import env from '../config/env'
import { TypeExercises } from '../models/type_exercises'
import { Users } from '../models/users'
import { sequelize } from './connection'
import { Models } from './models'
import { createReadings } from './seeds/readings'
import { createRoles } from './seeds/roles'
import { createTypeNotifications } from './seeds/type-notifications'

const { TypeEvent } = Models

export default async function setupDatabase() {
    await sequelize
        .sync({
            alter: true,
        })
        .then(() => console.log('Sincronizados modelos'))
    await TypeEvent.findOrCreate({
        where: {
            id: 1,
            description: 'IMPORTANT',
        },
    })
    await TypeEvent.findOrCreate({
        where: {
            id: 2,
            description: 'NOT IMPORTANT',
        },
    })

    await TypeExercises.findOrCreate({
        where: {
            id: 1,
            type: 'READING',
        },
    });

    if (env.NODE_ENV == 'test') {
        const { id: userId } = await Users.findOne({
            where: {
                name: 'danteBenitez__prueba',
            },
        })
        // await createEventsForTesting(10, userId)
        // await createCompleteExercise(10, userId)
    }


    await createReadings()
    await createTypeNotifications();
    await createRoles();
}
