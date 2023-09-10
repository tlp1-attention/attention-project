import { beforeAll, describe, test, expect } from '@jest/globals'
import request from 'supertest'
import { Server } from 'http'
import { server } from '../../src';
import { EXAMPLE_USER } from './auth';

const EXAMPLE_EVENT = {
    title: 'Test Event Title',
    description: 'Test event description',
    startDate: new Date('2023-09-13').toISOString(),
    endDate: new Date('2023-12-13').toISOString(),
    completed: false,
    userId: 1,
}

let token: string;
beforeAll(async () => {
    const { token: received } = 
        await request(server)
                .post('/register')
                .send(EXAMPLE_USER)
                .then(res => res.body);
    if (!token) token = received;
});

export const eventModuleSpecs = (server: Server) =>
    describe('Events Module', () => {
        describe('POST /api/events', () => {
            test('should reject events with no title or description', async () => {
                const eventWithNoTitle = {
                    ...EXAMPLE_EVENT,
                    title: '',
                }

                await request(server)
                    .post('/api/events')
                    .set('authorization', token)
                    .send(eventWithNoTitle)
                    .expect(400)
                    .then((res) => {
                        expect(res.body).toHaveProperty('errors')
                        expect(res.body.errors).toBeInstanceOf(Array)
                        expect(res.body.errors.length).toBeGreaterThan(0)
                    })

                const eventWithNoDescription = {
                    ...EXAMPLE_EVENT,
                    description: '',
                }

                await request(server)
                    .post('/api/events')
                    .set('authorization', token)
                    .send(eventWithNoDescription)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((res) => {
                        expect(res.body).toHaveProperty('errors')
                        expect(res.body.errors).toBeInstanceOf(Array)
                        expect(res.body.errors.length).toBeGreaterThan(0)
                    })
            })

            test('should reject events with no startTime', async () => {
                const eventWithNoStart = {
                    ...EXAMPLE_EVENT,
                    startTime: null,
                }

                await request(server)
                    .post('/api/events')
                    .set('authorization', token)
                    .send(eventWithNoStart)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((res) => {
                        expect(res.body).toHaveProperty('errors')
                        expect(res.body.errors).toBeInstanceOf(Array)
                        expect(res.body.errors.length).toBeGreaterThan(0)
                    })
            })

            test('should return a 201 Created and the event', async () => {
                const response = await request(server)
                    .post('/api/events')
                    .set('authorization', token)
                    .send(EXAMPLE_EVENT)
                
                console.log(response.body);
            })
        })

        describe('GET /api/events', () => {
            test('should return an array of events or 404 Not Found', async () => {
                await request(server)
                    .get('/api/events')
                    .then((res) => {
                        if (res.statusCode == 200) {
                            expect(res.body).toHaveProperty('events')
                            expect(res.body.events).toBeInstanceOf(Array)
                        } else if (res.statusCode == 404) {
                            expect(res.body).toHaveProperty('message')
                        }
                    })
            })

            test('should return 200 OK and an event or 404 Not Found', async () => {
                await request(server)
                    .get('/api/events/1')
                    .then((res) => {
                        if (res.statusCode == 200) {
                            expect(res.body).toHaveProperty('event')
                            expect(res.body.event).toHaveProperty('title')
                        } else if (res.statusCode == 404) {
                            expect(res.body).toHaveProperty('message')
                        }
                    })
            })
        })

        describe('DELETE /api/events', () => {
            test('should return a 200 OK and the deleted instance', async () => {
                const response = await request(server)
                    .post('/api/events')
                    .set('authorization', token)
                    .send(EXAMPLE_EVENT)
                    .expect(200)
                    .then((res) => res.body)

                console.log(response);

                await request(server)
                    .delete(`/api/events/${response.event.id}`)
                    .expect(200)
                    .then((res) => {
                        expect(res.body).toHaveProperty('message')
                        expect(res.body).toHaveProperty('event')
                        expect(res.body.event).toHaveProperty('title')
                    })
            })
        })
    })
