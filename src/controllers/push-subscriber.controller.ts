import type { Response } from 'express'
import webpush from 'web-push'
import configEnv from '../config/env'
import type { AuthRequest } from '../interfaces/auth-request'
import { subscriptionService } from '../services/subscription.service'

const { WEB_PUSH } = configEnv

webpush.setVapidDetails(
    WEB_PUSH.NOTIFICATION_EMAIL,
    WEB_PUSH.VAPID_PUBLIC_KEY,
    WEB_PUSH.VAPID_PRIVATE_KEY
)

function sendMessage(payload: any, userId: number) {
    console.log("Enviando notificación: ", payload);
    return subscriptionService.sendNotification(userId, payload)
}

async function createSubscription(req: AuthRequest, res: Response) {
    const { id: userId } = req.user
    const subscription = req.body

    try {
        const subscribed = await subscriptionService.subscribeUser(
            userId,
            subscription
        )

        if (!subscribed) {
            return res.status(404).json({
                message: 'Hubo un error al realizar la subscripción',
            })
        }

        res.status(201).json({
            message: 'Subscripto correctamente',
            user: subscribed,
        })
    } catch (err) {
        console.error('Error has ocurred: ', err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function sendPublicKey(_req: AuthRequest, res: Response) {
    res.status(200).json({
        publicKey: subscriptionService.getPublicKey(),
    })
}

async function deleteSubscription(req: AuthRequest, res: Response) {
    const { id: userId } = req.user

    try {
        const subscriptionFound = await subscriptionService.unsubscribeUser(
            userId
        )

        if (!subscriptionFound) throw { status: 404 }

        subscriptionFound.update({
            subscriptionPayload: null,
        })

        if (!subscriptionFound) {
            return res.status(404).json({
                message:
                    'Hubo un error al eliminar la subscripción. Puede que el usuario no exista',
            })
        }

        res.status(200).json({
            message: 'Desuscrito correctamente',
            user: subscriptionFound,
        })
    } catch (err) {
        console.error('Error has ocurred: ', err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export { createSubscription, deleteSubscription, sendMessage, sendPublicKey }
