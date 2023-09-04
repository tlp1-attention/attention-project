import { Models } from "./models";

const { TypeEvent } = Models;

export default async function setupDatabase() {
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
}
// Automatically create events types if not present in the database
/*
export {
    Models
}*/
