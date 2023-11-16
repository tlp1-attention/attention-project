import { EventEmitter2 } from 'eventemitter2';

interface IEventEmitter {
    emit(names: string )
}

/**
 * Service that allows for the application to emit
 * and listen for different events.
 */
export const eventEmitterService: IEventEmitter = new EventEmitter2();