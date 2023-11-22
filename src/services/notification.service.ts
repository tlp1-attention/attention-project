import { Server, Socket } from 'socket.io'
import {
    NotificationCreationAttributes,
    Notifications,
} from '../models/notifications'
import { TypeNotifications } from '../models/type-notifications'
import { AppEventsMap } from './emitter/app-events-map'
import { APP_EVENTS } from './emitter/emit.interface'
import { emitterService } from './emitter/emitter.service'
import { SocketService, socketService as _socketService } from './socket.service'

/**
 * Service that abstracts away the
 * operation of sending notifications
 * to users through a {@link socketService.io} Server
 *
 * It registers event listeners to
 * many events on the application to send
 * notifications when those happen
 */
export class NotificationService {
    private socketService: SocketService;
    
    constructor(
        private eventEmitter: typeof emitterService,
        private notificationModel: typeof Notifications,
        private typeNotificationModel: typeof TypeNotifications
    ) {
        
    }

    /**
     * Attach the notification service to a
     * Websocket server
     */
    attach(server: SocketService) {
        this.socketService = server;
        this.registerListeners();
        // We implement a socket to
        // send notifications to users
        this.socketService.useMiddleware((socket, next) => {
            socket.on('get-notifications', async () => {
                // If socket is authenticated, we send notifications
                // else, we pass to the next handlers
                // action
                if (!socket.data.userId) return next();
                const notifications = await this.findAll(socket.data.userId)
                this.socketService.emitEventToRoom(
                    'all-notifications',
                    notifications,
                    socket.data.userId
                );
            });

            next();
        });
    }
    /**
     * Maps Application Events {@link APP_EVENTS}
     * to {@link TypeNotifications} instances
     */
    static eventsToTypeNotifications: {
        [k in keyof AppEventsMap]?: number
    } = {
        [APP_EVENTS.EVENT.CLOSE]: 1,
        [APP_EVENTS.TIMER.WORK_DONE]: 2,
        [APP_EVENTS.TIMER.FREE_DONE]: 3,
        [APP_EVENTS.COLABORATION.CONTACT]: 4,
        [APP_EVENTS.COMPLETED_EXERCISE.RECORD]: 5,
    }
    /**
     * Send a notification to a given user
     *
     * @param {Notifications} notification
     */
    private async sendNotification(
        notification: NotificationCreationAttributes
    ) {
        const created = await this.notificationModel.create(notification)
        this.socketService.emitEventToRoom(
            'new-notification',
            created,
            notification.userId
        )
    }

    /**
     * Finds all notifications given its userId
     */
    private async findAll(userId: number) {
        return this.notificationModel.findAll({
            where: { userId },
        })
    }

    /**
     * Register listeners for any events
     * from which we want to send notifications
     */
    private registerListeners() {
        const entries = Object.entries(
            NotificationService.eventsToTypeNotifications
        )
        for (const [eventName, typeId] of entries) {
            this.eventEmitter.on(
                eventName as keyof AppEventsMap,
                async (data, userId) => {
                    const type = await this.typeNotificationModel.findByPk(
                        typeId
                    )

                    this.sendNotification({
                        read: false,
                        typeId,
                        title: `${type.description}`,
                        content: '',
                        userId: userId,
                    })
                }
            )
        }
    }
}

export const notificationService = new NotificationService(
    emitterService,
    Notifications,
    TypeNotifications
)
