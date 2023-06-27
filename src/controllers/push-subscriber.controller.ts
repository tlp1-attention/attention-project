import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/validate_jwt';
import { Users } from '../models/users'
import webpush from 'web-push'

webpush.setVapidDetails(
    'mailto:benitezdante123@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);


function sendMessage(payload: any, subscription: webpush.PushSubscription) { 
    return webpush.sendNotification(subscription, JSON.stringify(payload));
}

async function createSubscription(req: AuthRequest, res: Response) {

    const { id } = req.user;
    const subscription = req.body;

    try {
        const result = await Users.update({
            subscriptionPayload: subscription,
         }, {
                where: {
                    id
                }
            }
        );

        if (!result) throw ({ status: 404 });

        res.sendStatus(201);

    } catch(err) {
        console.error('Error has ocurred: ', err);
        res.sendStatus(err.status || 500);
    }
}

async function sendPublicKey(_req: AuthRequest, res: Response) {
    res.status(200).json({
        publicKey: process.env.VAPID_PUBLIC_KEY
    });
}

async function deleteSubscription(req: Request, res: Response) {
    const subscription = req.body;
    
    try {
        const subscriptionFound = await Users.update({
            subscriptionPayload: null,
        }, {
                where: {
                    subscriptionPayload: subscription
                }
            }
        );

        if (!subscriptionFound) throw ({ status: 404 });

        res.sendStatus(200);

    } catch(err) {
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

