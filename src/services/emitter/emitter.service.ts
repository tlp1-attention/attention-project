import { EventEmitter2 } from 'eventemitter2'
import { APP_EVENTS, IndividualEvent } from './emit.interface'
import { Events } from '../../models/events'

type ValueOf<T> = T[keyof T]

/**
 * A type that maps event names to its corresponding
 * type params
 */
type AppEventsMap = {
    [k in ValueOf<(typeof APP_EVENTS)['EVENT']>]: Events
}

/**
 * Service that allows for the application to emit
 * and listen for different events.
 *
 * We extend the base class {@link EventEmitter2} to strictly type-check
 * our events
 */
export class EventEmitterService<EventsMap> extends EventEmitter2 {
    emit<TEventName extends keyof EventsMap & string>(
        eventName: TEventName,
        value: EventsMap[TEventName]
    ) {
        return super.emit(eventName, value)
    }

    on<TEventName extends keyof EventsMap & string>(
        eventName: IndividualEvent,
        listener: (value: EventsMap[TEventName]) => void
    ) {
        return super.on(eventName, listener)
    }
}

export const emitterService = new EventEmitterService<AppEventsMap>();
