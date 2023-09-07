import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './database/connection';
import cookieParser from 'cookie-parser'

import { loggingMiddleware } from './middleware/logging'
import session from 'express-session';
import connectSQLite from 'connect-sqlite3';

import loginRouter from './routes/auth.routes'
import staticServer from './middleware/__server-static.middleware';
import indexRouter from './routes/index.routes'
import workSpaceRouter from './routes/workspace.routes'
import eventRouter from './routes/events.routes'
import webPushRouter from './routes/push-subscription.routes';
import { resolve } from 'path';
import configEnv from './config/env';

const app = express();
const SessionStore = connectSQLite(session);
const SESSION_PATH = resolve('./session-store');


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
app.use(loggingMiddleware);
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false // Allow CDN's resources to be delivered
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: configEnv.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: true
  },
  store: new SessionStore({
    db: 'session.db',
    table: 'sessions',
    dir: SESSION_PATH
  }) as session.Store
}));

// Custom middleware
app.use(staticServer);

// Routes
app.use(loginRouter);
app.use(indexRouter);
app.use(workSpaceRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', webPushRouter);


export default app;
