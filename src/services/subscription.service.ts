import webpush, { SendResult } from 'web-push'
import { UserService, userService } from './user.service'
import env from '../config/env'
import { Users } from '../models/users'

/**
 * Class that manages web push subscriptions and
 * messages. It performs three basic activities:
 *  a) Allow to subscribe to notifications
 *  b) Allow to unsubscribe to notifications
 *  c) Allow to send notifications
 */

export class SubscriptionService {
    private publicKey: string;

    constructor(
        private userService: UserService,
        private notificationService: typeof webpush
    ) {
        const { NOTIFICATION_EMAIL, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } =
            env.WEB_PUSH

        // Set up VAPID details of the service
        this.notificationService.setVapidDetails(
            NOTIFICATION_EMAIL,
            VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY
        );

        this.publicKey = VAPID_PUBLIC_KEY;
    }

    /**
     * Return the VAPID public key to send over the network
     * 
     * @returns {number}
     */
    getPublicKey(): string {
        return this.publicKey;
    }

    /**
     *  Subscribes a given user to a notification service
     * @param {number} userId
     * @param {webpush.PushSubscription} subscription -The payload
     * from the subscription, as returned, e. g. by the Notifications API
     * on the browser.
     * @returns {Promise<Users | null>} The newly subscribed User or null
     * if there was an error
     */
    async subscribeUser(
        userId: number,
        subscription: webpush.PushSubscription
    ): Promise<Users | null> {
        const userFound = await this.userService.findById(userId)

        if (!userFound) {
            return null;
        }

        try {
            const updated = await this.userService.update(userId, {
                ...userFound,
                subscriptionPayload: JSON.stringify(subscription),
            });
            return updated;
        } catch (err) {
            console.error('There was an error updating the User', err);
            return null;
        }
    }


    /**
     *  Unsubscribe a given user from the notification service
     * @param {number} userId
     * @returns {Promise<Users | null>} The User without subscription
     * or null if there was an error
     */
    async unsubscribeUser(
        userId: number,
    ): Promise<Users | null> {
        const userFound = await this.userService.findById(userId)

        if (!userFound) {
            return null;
        }
        try {
            const updated = await this.userService.update(userId, {
                ...userFound,
                subscriptionPayload: null,
            });

            return updated;

        } catch (err) {
            console.error('There was an error updating the User: ', err);
            return null;
        }
    }

    /**
     * Sends a notification to a given User
     * @param {number} userId
     * @param {any} payload - To send
     * @returns {Promise<SendResult | null>}  Indicates whether the operation
     * completed properly or not
     */
    async sendNotification(
        userId: number,
        payload: any
    ): Promise<SendResult | null> {
        const userFound = await this.userService.findById(userId);

        if (!userFound.subscriptionPayload) {
            return null;
        }

        try {
            const formatted = userFound.subscriptionPayload.replaceAll('\\', '');
            const parsed = JSON.parse(formatted.slice(1, formatted.length - 1));
            return webpush.sendNotification(
                parsed,
                payload
            );

        } catch (err) {
            console.error('There was an error sending the notification: ', err);
            return null;
        }
    }
}

export const subscriptionService = new SubscriptionService(
    userService,
    webpush
);