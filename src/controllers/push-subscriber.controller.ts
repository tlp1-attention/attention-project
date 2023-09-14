import type { Response } from 'express'
import webpush from 'web-push'
import configEnv from '../config/env'
import type { AuthRequest } from '../interfaces/auth-request'
import { Users } from '../models/users'

const { WEB_PUSH } = configEnv

webpush.setVapidDetails(
    WEB_PUSH.NOTIFICATION_EMAIL,
    WEB_PUSH.VAPID_PUBLIC_KEY,
    WEB_PUSH.VAPID_PRIVATE_KEY
)

function sendMessage(payload: any, subscription: webpush.PushSubscription) {
    return webpush.sendNotification(subscription, JSON.stringify(payload))
}

async function createSubscription(req: AuthRequest, res: Response) {
    const { id } = req.user
    const subscription = req.body

    try {
        const result = await Users.update(
            {
                subscriptionPayload: subscription,
            },
            {
                where: {
                    id,
                },
            }
        )

        if (!result) throw { status: 404 }

        res.sendStatus(201)
    } catch (err) {
        console.error('Error has ocurred: ', err)
        res.sendStatus(err.status || 500)
    }
}

async function sendPublicKey(_req: AuthRequest, res: Response) {
    res.status(200).json({
        publicKey: process.env.VAPID_PUBLIC_KEY,
    })
}

async function deleteSubscription(req: AuthRequest, res: Response) {
    const { id: userId } = req.user

    try {
        const subscriptionFound = await Users.findByPk(userId)

        if (!subscriptionFound) throw { status: 404 }

        subscriptionFound.update({
            subscriptionPayload: null,
        })

        res.sendStatus(200)
    } catch (err) {
        console.error('Error has ocurred: ', err)
        res.sendStatus(err.status || 500)
    }
}

export { createSubscription, deleteSubscription, sendMessage, sendPublicKey }
