import { TypeNotifications } from '../../models/type-notifications'

const TYPES_NOTIFICATION = [
    { 
        description: 'Evento próximo',
        iconUrl: 'https://img.icons8.com/fluency-systems-filled/48/event.png'
    },
    {
        description: 'Temporizador de trabajo concluido',
        iconUrl: 'https://img.icons8.com/ios-glyphs/30/timer.png'
    },
    { 
        description: 'Temporizador de tiempo libre concluido',
        iconUrl: 'https://img.icons8.com/ios-glyphs/30/timer.png'
    },
    {
        description: 'Solicitación de comunicación',
        iconUrl: 'https://img.icons8.com/ios/50/chat-message--v1.png'
    },
    { 
        description: 'Récord de ejercicios completados',
        iconUrl: 'https://img.icons8.com/ios-filled/50/prize.png'
    },
]

export async function createTypeNotifications() {
    for (const type of TYPES_NOTIFICATION) {
        await TypeNotifications.findOrCreate({
            where: {
                iconUrl: type.iconUrl,
                description: type.description,
            },
        })
    }
}
