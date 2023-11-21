import { createServer } from 'http';
import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { socketService } from './services/socket.service';
import { scheduleReminders } from './utils/schedule-reminder';
import { setupLogger } from './services/logger.service';

const PORT = env.PORT;

const httpServer = createServer(app);;
socketService.runOn(httpServer);

export const server = httpServer.listen(PORT, async () => {
    await scheduleReminders();
    await setupDatabase()
        .then(() => console.log('Base de datos configurada.'));
    setupLogger();
    console.log(`Server listening in: http://localhost:${PORT}`);
});

