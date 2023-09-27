import type { Response } from 'express'
import webpush from 'web-push'
<<<<<<< HEAD
console.log(webpush.generateVAPIDKeys())
=======
import configEnv from '../config/env'
import type { AuthRequest } from '../interfaces/auth-request'
import { subscriptionService } from '../services/subscription.service'

const { WEB_PUSH } = configEnv
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e

webpush.setVapidDetails(
    WEB_PUSH.NOTIFICATION_EMAIL,
    WEB_PUSH.VAPID_PUBLIC_KEY,
    WEB_PUSH.VAPID_PRIVATE_KEY
)

<<<<<<< HEAD



function sendMessage(payload: any, subscription: webpush.PushSubscription) {
    return webpush.sendNotification(subscription, JSON.stringify(payload));
=======
function sendMessage(payload: any, userId: number) {
    return subscriptionService.sendNotification(userId, payload)
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
}

async function createSubscription(req: AuthRequest, res: Response) {
    const { id: userId } = req.user
    const subscription = req.body

    try {
<<<<<<< HEAD
        const result = await Users.update({
            subscriptionPayload: subscription,
        }, {
            where: {
                id
            }
        }
        );
=======
        const subscribed = await subscriptionService.subscribeUser(
            userId,
            subscription
        )
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e

        if (!subscribed) {
            return res.status(404).json({
                message: 'Hubo un error al realizar la subscripción',
            })
        }

<<<<<<< HEAD
        res.sendStatus(201);

    } catch (err) {
        console.error('Error has ocurred: ', err);
        res.sendStatus(err.status || 500);
=======
        res.status(201).json({
            message: 'Subscripto correctamente',
            user: subscribed,
        })
    } catch (err) {
        console.error('Error has ocurred: ', err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
    }
}

async function sendPublicKey(_req: AuthRequest, res: Response) {
    res.status(200).json({
        publicKey: subscriptionService.getPublicKey(),
    })
}

async function deleteSubscription(req: AuthRequest, res: Response) {
<<<<<<< HEAD
    const { id: userId } = req.user;

    try {
        const subscriptionFound = await Users.findByPk(userId);
=======
    const { id: userId } = req.user
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e

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

<<<<<<< HEAD
    } catch (err) {
        console.error('Error has ocurred: ', err);
        res.sendStatus(err.status || 500);
    }
}

export {
    createSubscription,
    sendPublicKey,
    deleteSubscription,
    sendMessage
};

=======
        res.send(200).json({
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
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
