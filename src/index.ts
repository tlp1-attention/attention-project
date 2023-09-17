import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';

const PORT = env.PORT;

// Export a listening server for testing
export const server = app.listen(PORT, async () => {
    // await scheduleReminders();
    await setupDatabase();
    console.log(`Server listening in: http://localhost:${PORT}`);
});