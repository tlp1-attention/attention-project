import { createServer } from 'http'
import app from './app'
import env from './config/env'
import setupDatabase from './database/setup'
import { setupLogger } from './services/logger.service'
import { notificationService } from './services/notification.service'
import { socketService } from './services/socket/socket.service'
import { scheduleReminders } from './utils/schedule-reminder'

const PORT = env.PORT

async function runServer() {
    const httpServer = createServer(app)
    notificationService.attach(socketService)
    socketService.runOn(httpServer);
    const shouldRunDatabaseSetup = process.argv[2] === "--setup";
    if (shouldRunDatabaseSetup) {
        await setupDatabase().then(() => console.log('Base de datos configurada.'))
    }
    await scheduleReminders();
    setupLogger();

    return httpServer.listen(PORT, () => {
        console.log(`Server listening in: http://localhost:${PORT}`)
    });
}

export const server = runServer();


