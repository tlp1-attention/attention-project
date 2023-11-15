import { createServer } from 'http';
import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { socketServerFrom } from './services/socket.service';
import { scheduleReminders } from './utils/schedule-reminder';

const PORT = env.PORT;

const httpServer = createServer(app);
const socketServer = socketServerFrom(httpServer);
socketServer.run();

export const server = httpServer.listen(PORT, async () => {
    await scheduleReminders();
    await setupDatabase();
    console.log(`Server listening in: http://localhost:${PORT}`);
});

