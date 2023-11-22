import { Events } from '../../models/events'
import { Exercises } from '../../models/exercises'
import { Users } from '../../models/users'
import { ValueOf } from '../../utils/value-of'
import { APP_EVENTS } from './emit.interface'

/**
 * A type that maps event names to its corresponding
 * type params
 */
export type AppEventsMap = {
    [k in ValueOf<(typeof APP_EVENTS)['EVENT']>]: [payload: Events, userId: number]
} & {
    [k in ValueOf<(typeof APP_EVENTS)['EXERCISE']>]: [payload: Exercises, userId: number]
} & {
    /** For a timer event, we just receive the userId */
    [k in ValueOf<(typeof APP_EVENTS)['TIMER']>]: [payload: undefined, userId: number]
} & {
    /**
     * For a colaboration event, we receive the
     * contacted user
     */
    [k in ValueOf<(typeof APP_EVENTS)['COLABORATION']>]: [payload: Users, userId: number]
} & {
    /** 
     * For a exercise record event, receive the number of 
     * completed exercises
     */
    [k in ValueOf<
        (typeof APP_EVENTS)['COMPLETED_EXERCISE']
    >]: [payload: number, userId: number]
}
