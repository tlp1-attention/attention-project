import { describe } from "@jest/globals";
import { authModuleSpec } from "./auth";
import { beforeAll, afterAll } from '@jest/globals';
import { sequelize } from '../../src/database/connection';
import { server as _server } from '../../src';
import env from '../../src/config/env';
import setupDatabase from "../../src/database/setup";
import { eventModuleSpecs } from "./events";
import { Server } from "http";

let server: Server;

afterAll(async () => {
    if (env.NODE_ENV !== 'test') {
        throw new Error('Should not run tests outside of the `test` environment. ')
    }
    await sequelize.sync({ force: true });
    await sequelize.close();
    server.close();
}, 10_000_000);

beforeAll(async () => {
    // Fill neccesary data
    server = await _server;
    await sequelize.sync({ force: true });
    await setupDatabase();
}, 10_000_000);

describe('App E2E Testing', () => {
    authModuleSpec(server);
    eventModuleSpecs(server);
});
