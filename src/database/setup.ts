import { sequelize } from "./connection";
import { Models } from "./models";
import { createReadings } from "./seeds/readings";

const { TypeEvent } = Models;

export default async function setupDatabase() {
    await sequelize.sync({
        alter: true  
    }).then(() => console.log("Sincronizados modelos"));
    await TypeEvent.findOrCreate({
        where: {
            id: 1,
            description: 'IMPORTANT',
        },
    });
    await TypeEvent.findOrCreate({
        where: {
            id: 2,
            description: 'NOT IMPORTANT',
        },
    });
   await createReadings();
}