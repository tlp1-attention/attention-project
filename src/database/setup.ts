import env from "../config/env";
import { sequelize } from "./connection";
import { Models } from "./models";

const { TypeEvent } = Models;

export default async function setupDatabase() {
    await sequelize.sync({ force: env.NODE_ENV === "test" });
    await TypeEvent.findOrCreate({
        where: {
            id: 1,
            description: 'IMPORTANT',
        },
        defaults: {
            id: 1,
            description: 'IMPORTANT'
        }
    });
    await TypeEvent.findOrCreate({
        where: {
            id: 2,
            description: 'NOT IMPORTANT',
        },
        defaults: {
            id: 1,
            description: 'NOT IMPORTANT'
        }
    });

}