import type { Request, Response } from 'express';
import webpush from 'web-push'

webpush.setVapidDetails(
    'mailto:benitezdante123@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);


function sendMessage(message: string, subscription: webpush.PushSubscription) { 
    const payload = JSON.stringify({ 
         title: 'Test Push Notificaction', 
         message: message
    });
    return webpush.sendNotification(subscription, payload);
}


async function createSubscription(req: Request, res: Response) {

    const subscription = req.body;

    try {
        const result = await sendMessage('Subscription enabled!', subscription);

        console.log('Succesful result: ' + result);

        res.sendStatus(201);

    } catch(err) {
        console.error('Error has ocurred: ', err);
    }
}

export default createSubscription;

