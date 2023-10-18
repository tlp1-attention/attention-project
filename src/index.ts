import app from './app';
import env from './config/env';
import setupDatabase from './database/setup';
import { eventService } from './services/event.service';
import { scheduleReminders } from './utils/schedule-reminder';

const PORT = env.PORT;



// Export a listening server for testing
export const server = app.listen(PORT, async () => {
    await eventService.getCountByWeek(2);
    await scheduleReminders();
    await setupDatabase();
    console.log(`Server listening in: http://localhost:${PORT}`);
});