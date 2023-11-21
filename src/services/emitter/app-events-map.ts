import { Events } from '../../models/events'
import { Exercises } from '../../models/exercises'
import { ValueOf } from '../../utils/value-of'
import { APP_EVENTS } from './emit.interface'

/**
 * A type that maps event names to its corresponding
 * type params
 */
export type AppEventsMap = {
    [k in ValueOf<(typeof APP_EVENTS)['EVENT']>]: Events
} & {
    [k in ValueOf<(typeof APP_EVENTS)['EXERCISE']>]: Exercises
}
