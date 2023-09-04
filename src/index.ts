import app from './app';
import env from './config/env';

const PORT = env.PORT;

// Export a listening server for testing
export const server = app.listen(PORT, async () => {
    // await scheduleReminders();
    console.log(`Server listening in port: http://localhost:${PORT}`);
});