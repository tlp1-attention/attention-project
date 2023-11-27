<<<<<<< HEAD
import { createServer } from 'http'
import app from './app'
import env from './config/env'
import setupDatabase from './database/setup'
import { setupLogger } from './services/logger.service'
import { notificationService } from './services/notification.service'
import { socketService } from './services/socket/socket.service'
import { scheduleReminders } from './utils/schedule-reminder'
=======
import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { sequelize } from './db';
>>>>>>> 7fbfb1a9804b94b34aeaaf88830c651993f466d4

const PORT = env.PORT

<<<<<<< HEAD
const httpServer = createServer(app)
notificationService.attach(socketService)
socketService.runOn(httpServer)

export const server = httpServer.listen(PORT, async () => {
    await scheduleReminders()
    await setupDatabase().then(() => console.log('Base de datos configurada.'))
    setupLogger()
    console.log(`Server listening in: http://localhost:${PORT}`)
})
=======
// Export a listening server for testing
export const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false })
    // await scheduleReminders();
    await setupDatabase();
    console.log(`Server listening in: http://localhost:${PORT}`);
});
>>>>>>> 7fbfb1a9804b94b34aeaaf88830c651993f466d4
