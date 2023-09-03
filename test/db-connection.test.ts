import { sequelize } from '../src/database/connection'

describe('Database tests', () => {
    test('Testing database connection', async () => {

        const _authentication = await sequelize.authenticate();
    })
})

