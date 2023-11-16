import { TypeNotifications } from '../../models/type-notifications'

const TYPES_NOTIFICATION = [
    'Evento próximo',
    'Temporizador de trabajo concluido',
    'Temporizador de tiempo libre concluido',
    'Solicitación de comunicación',
    'Récord de ejercicios completados',
]

export async function createTypeNotifications() {
    for (const type of TYPES_NOTIFICATION) {
        await TypeNotifications.findOrCreate({
            where: {
                description: type,
            },
        })
    }
}
