import { describe, test } from '@jest/globals'
import { sequelize, Models } from '../src/db'

const { Users } = Models;

describe('Database tests', () => {
    test('Testing database connection', async () => {

        const _authentication = await sequelize.authenticate();
    })
})

