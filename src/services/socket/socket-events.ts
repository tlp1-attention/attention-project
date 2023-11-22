import {
    Notifications,
    NotificationsAttributes,
} from '../../models/notifications'
import {
    TypeNotifications,
    TypeNotificationsAttributes,
} from '../../models/type-notifications'

/**
 * Maps possible Websocket events to the
 * data sent with it
 */
export type WEBSOCKET_EVENTS = {
    'new-notification': NotificationsAttributes & {
        type: TypeNotificationsAttributes
    }
    'get-notifications': undefined
    'all-notifications': (NotificationsAttributes & {
        type: TypeNotificationsAttributes
    })[]
}
