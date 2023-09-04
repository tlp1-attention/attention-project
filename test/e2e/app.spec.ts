import { describe } from "@jest/globals";
import { authModuleSpec } from "./auth";
import { beforeEach, afterAll } from '@jest/globals';
import { sequelize } from '../../src/database/connection';
import { server } from '../../src';
import env from '../../src/config/env';

afterAll(async () => {
    if (env.NODE_ENV !== 'test') {
        throw new Error('Should not run tests outside of the `test` environment. ')
    }
    await sequelize.close();
}, 10_000_000);

beforeEach(async () => {
    await sequelize.sync({ force: true });
    server.close();
}, 10_000_000);

describe('App E2E Testing', () => {
    authModuleSpec(server);
})
