import { createServer } from 'http'
import app from './app'
import env from './config/env'
import setupDatabase from './database/setup'
import { setupLogger } from './services/logger.service'
import { notificationService } from './services/notification.service'
import { socketService } from './services/socket/socket.service'
import { scheduleReminders } from './utils/schedule-reminder'

const PORT = env.PORT

const httpServer = createServer(app)
notificationService.attach(socketService)
socketService.runOn(httpServer)

export const server = httpServer.listen(PORT, async () => {
    await scheduleReminders()
    await setupDatabase().then(() => console.log('Base de datos configurada.'))
    setupLogger()
    console.log(`Server listening in: http://localhost:${PORT}`)
})
