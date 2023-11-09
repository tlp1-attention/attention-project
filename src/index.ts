import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { sequelize } from './db';

const PORT = env.PORT;

// Export a listening server for testing
export const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false })
    // await scheduleReminders();
    await setupDatabase();
    console.log(`Server listening in: http://localhost:${PORT}`);
});