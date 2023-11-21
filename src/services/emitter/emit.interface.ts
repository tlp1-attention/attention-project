import { Listener } from "eventemitter2";

export const APP_EVENTS = {
    EVENT: { 
        CREATION: "event.create",
        DELETION: "event.delete",
        UPDATE: "event.update",
        LIST: "event.list",
        SHOW: "event.show",
        CLOSE: "event.close"
    },

    EXERCISE: {
        CREATION: "exercise.create",
        DELETION: "exercise.delete",
        UPDATE: "exercise.update",
    },

    COMPLETED_EXERCISE: {
        CREATION: "completed_exercise.create",
        DELETION: "completed_exercise.delete",
        RECORD: "exercise.record"
    },
    
    TIMER: {
        WORK_DONE: "timer.work.done",
        FREE_DONE: "timer.free.done"
    },

    COLABORATION: {
        CONTACT: "colaboration.contact"
    }
} as const;

type ValueOf<T> = T[keyof T];

export type EventNames = {
    EventModel: ValueOf<typeof APP_EVENTS["EVENT"]>;
    ExerciseModel: ValueOf<typeof APP_EVENTS["EXERCISE"]>;
    CompletedExerciseModel: ValueOf<typeof APP_EVENTS["COMPLETED_EXERCISE"]>;
}

export type IndividualEvent = ValueOf<EventNames>;

export interface IEventEmitter<EventNames extends IndividualEvent, Payload> {
    emit(eventName: EventNames, payload: Payload): boolean;
    on(eventName: EventNames, listener: (value: Payload) => void): this | Listener;
}