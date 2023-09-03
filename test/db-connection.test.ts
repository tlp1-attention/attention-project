import { sequelize } from '../src/database/connection'

afterAll(async () => {
    await sequelize.close();
})

describe('Database tests', () => {
    test('Testing database connection', async () => {

        const _authentication = await sequelize.authenticate();
    })
})

