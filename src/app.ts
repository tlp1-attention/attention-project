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
import { scheduleReminders } from './utils/schedule-reminder';


const { Events, Users } = Models;

const app = express();

const PORT = process.env.PORT || 8080;

// Check database connection
sequelize.authenticate()
    .then(() => {
        console.log('Succesful database connection');
    })
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

app.listen(PORT, async () => {
    // await scheduleReminders();
    console.log(`Server listening in port: http://localhost:${PORT}`);
});

