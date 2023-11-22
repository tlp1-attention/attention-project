import { Notifications } from "../../models/notifications";

/**
 * Maps possible Websocket events to the
 * data sent with it
 */
export type WEBSOCKET_EVENTS = {
    'new-notification': Notifications,
    'get-notifications': undefined,
    'all-notifications': Notifications[]
}