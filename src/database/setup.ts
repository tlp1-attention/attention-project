import { TypeExercises } from "../models/type_exercises";
import { sequelize } from "./connection";
import { Models } from "./models";
import { createCompleteExercise } from "./seeds/mock/complete_exercises";
import { createEventsForTesting } from "./seeds/mock/events";
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

    await TypeExercises.findOrCreate({
        where: {
            id: 1,
            type: 'READING' 
        }
    });

    const userId = 5;

    await createEventsForTesting(10, userId);
    await createCompleteExercise(10, userId);

   await createReadings();
}