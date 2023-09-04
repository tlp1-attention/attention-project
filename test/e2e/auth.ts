import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { Server } from 'http'

const EXAMPLE_USER = {
    username: 'Test__user01',
    password: 'test__Password01',
    email: 'example123@gmail.com',
}

export const authModuleSpec = (server: Server) =>
    describe('Auth Module', () => {
        describe('POST /register', () => {
            test('should reject malformed data', async () => {
                const userWithNoEmail = {
                    ...EXAMPLE_USER,
                    email: '',
                }

                await request(server)
                    .post('/register')
                    .send(userWithNoEmail)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.errors).toBeDefined()
                    })

                const userWithUnsecurePassword = {
                    ...EXAMPLE_USER,
                    password: 'unsecure',
                }

                await request(server)
                    .post('/register')
                    .send(userWithUnsecurePassword)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.errors).toBeDefined()
                    })
            })

            test('should return 201 Created and a token', async () => {
                await request(server)
                    .post('/register')
                    .send(EXAMPLE_USER)
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.message).toBeDefined()
                        expect(response.body.token).toBeDefined()
                    })
            })
        })

        describe('POST /login', () => {
            test('should reject malformed data', async () => {
                const userWithNoName = {
                    ...EXAMPLE_USER,
                    username: '',
                }

                await request(server)
                    .post('/login')
                    .send(userWithNoName)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.errors).toBeDefined()
                        expect(response.body.errors).toBeInstanceOf(Array)
                        expect(response.body.errors.length).toBeGreaterThan(0)
                    })

                const userWithNoPassword = {
                    ...EXAMPLE_USER,
                    password: '',
                }

                await request(server)
                    .post('/login')
                    .send(userWithNoPassword)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.errors).toBeDefined()
                        expect(response.body.errors).toBeInstanceOf(Array)
                        expect(response.body.errors.length).toBeGreaterThan(0)
                    })
            })

            test('should return a 200 OK and a token', async () => {
                await request(server)
                    .post('/login')
                    .send(EXAMPLE_USER)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((response) => {
                        expect(response.body.message).toBeDefined()
                        expect(response.body.token).toBeDefined()
                    })
            })
        })
    })
