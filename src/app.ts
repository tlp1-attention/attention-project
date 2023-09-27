import express from 'express'
<<<<<<< HEAD
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { createTypeEvents, sequelize } from './db';
=======
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './database/connection';
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
import cookieParser from 'cookie-parser'

import session from 'express-session';
import connectSQLite from 'connect-sqlite3';

import loginRouter from './routes/auth.routes'
import staticServer from './middleware/__server-static.middleware';
import { logRequests } from './middleware/logging'
import indexRouter from './routes/index.routes'
import workSpaceRouter from './routes/workspace.routes'
import eventRouter from './routes/events.routes'
import webPushRouter from './routes/push-subscription.routes';
import preferenceRouter from './routes/preferences.routes';
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
app.use(logRequests);
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
app.use('/api/users/preferences', preferenceRouter);

<<<<<<< HEAD
app.listen(PORT, async () => {
  // await scheduleReminders();
  await sequelize.sync();
  await createTypeEvents()
  console.log(`Server listening in port: http://localhost:${PORT}`);
});
=======
export default app;
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
