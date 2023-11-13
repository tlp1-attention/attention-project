import { createServer } from 'http';
import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { eventService } from './services/event.service';
import { socketServerFrom } from './services/socket.service';
import { scheduleReminders } from './utils/schedule-reminder';

const PORT = env.PORT;

// Export a listening server for testing
const httpServer = createServer(app);
const socketServer = socketServerFrom(httpServer);
socketServer.run();

export const server = httpServer.listen(PORT, async () => {
    await eventService.getCountByWeek(2);
    await scheduleReminders();
    await setupDatabase();

    

    console.log(`Server listening in: http://localhost:${PORT}`);
});

