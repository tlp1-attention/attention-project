import env from '../../../config/env'
import { Events } from '../../../models/events'
import { createDatesByWeek } from '../../../utils/createDatesByWeek'

export async function createEventsForTesting(quantity: number, userId: number) {
    if (env.NODE_ENV.startsWith('prod')) {
        throw new Error('Should not create mock events in Production.')
    }

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    const weekDates = createDatesByWeek(now, quantity)

    for (const date of weekDates) {
        Array.from({ length: Math.ceil(Math.random() * 10) }).forEach(
            async (_e, i) =>
                await Events.findOrCreate({
                    where: {
                        userId,
                        createdAt: date,
                        title: `Título de evento de prueba ${i}`,
                        description: `Descripción de evento de prueba ${i}`,
                        startDate: new Date(year, month, day + 1),
                        endDate: new Date(year, month, day + 2),
                        typeId: 1,
                    },
                })
        )
    }

    console.log('Creados eventos de prueba satisfactoriamente');
}
