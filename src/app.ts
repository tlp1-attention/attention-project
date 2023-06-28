import express from 'express'
import morgan  from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './db';
import cookieParser from 'cookie-parser'
import { sendMessage } from './controllers/push-subscriber.controller';
import { Model, Op } from 'sequelize';

import loginRouter from './routes/auth.routes';
import staticServer from './middleware/__server-static.middleware';
import indexRouter from './routes/index.routes'
import workSpaceRouter from './routes/workspace.routes'
import eventRouter from './routes/events.routes'
import webPushRouter from './routes/push-subscription.routes';
import { Models } from './db';
import { TypeEvent } from './models/type_events';

const { Events, Users } = Models;

const app = express();

const PORT = process.env.PORT || 8080;

// Check database connection
sequelize.authenticate()
    .then(() => console.log('Successful database connection'))
    .catch(console.error);

// Set ejs as template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Library Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false // Allow CDN's resources to be delivered
}));
app.use(cookieParser());

// Custom middleware
app.use(staticServer);

// Routes
app.use(loginRouter);
app.use(indexRouter);
app.use(workSpaceRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', webPushRouter);

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

setInterval(async () => {
    const subscribers = await Users.findAll({
        where: {
            [Op.not]: {
                subscriptionPayload: null
            }
        }
    })

    for (const user of subscribers) {
        const events = await user.getEvents();
        for (const event of events) {
            // Only remind of important events
            if (event.typeId !== 1) continue;

            const now = Date.now();

            if (event.startTime.getTime() - now< ONE_DAY_MS
                && event.remindedAt.getTime() - now > ONE_DAY_MS / 2) {
                const typeEvent = await event.getType();
                const payload = {
                    title: `Recordatorio de evento ${typeEvent.description.toLowerCase()}`,
                    message: `${event.title}`
                }
                try {
                    const result = await sendMessage(payload, JSON.parse(user.subscriptionPayload));
                } catch(err) {

                }

                // Once the reminder is sent, update the remindedAt column to avoid 
                // doing it again in other 12 hours 
                await event.update({
                    remindedAt: new Date()
                });
            }
        }
    }
}, 1000 * 60);

app.listen(PORT, () => {
    console.log(`Server listening in port: http://localhost:${PORT}`);
});

