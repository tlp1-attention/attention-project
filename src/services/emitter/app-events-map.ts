import { CompleteExercises } from '../../models/complete_exercises'
import { Events } from '../../models/events'
import { Exercises } from '../../models/exercises'
import { Users } from '../../models/users'
import { ValueOf } from '../../utils/value-of'
import {
    CompleteExercisesService,
    completeExerciseService,
} from '../complete-exercises.service'
import { APP_EVENTS } from './emit.interface'

/**
 * A type that maps event names to its corresponding
 * type params
 */
export type AppEventsMap = {
    [k in ValueOf<(typeof APP_EVENTS)['EVENT']>]: [Events, userId: number]
} & {
    [k in ValueOf<(typeof APP_EVENTS)['EXERCISE']>]: [Exercises, userId: number]
} & {
    /** For a timer event, we just receive the userId */
    [k in ValueOf<(typeof APP_EVENTS)['TIMER']>]: [string, userId: number]
} & {
    /**
     * For a colaboration event, we receive the
     * contacted user
     */
    [k in ValueOf<(typeof APP_EVENTS)['COLABORATION']>]: [Users, userId: number]
} & {
    /** 
     * For a exercise record event, receive the number of 
     * completed exercises
     */
    [k in ValueOf<
        (typeof APP_EVENTS)['COMPLETED_EXERCISE']
    >]: [number, userId: number]
}
