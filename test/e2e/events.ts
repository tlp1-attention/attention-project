import { describe, test, expect } from "@jest/globals";
import { Server } from "http";

const EXAMPLE_EVENT = {
    title: 'Test Event Title',
    description: 'Test event description',
    startTime: new Date('2022-09-13'),
    endTime: new Date('2022-12-13'),
    completed: false,
    userId: 1
};

export const eventModuleSpecs = (server: Server) => 
    describe('Events Module', () => {
        describe('POST /api/events', () => {
            



        })




    })


