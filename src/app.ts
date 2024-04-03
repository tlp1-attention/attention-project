import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './database/connection';
import cookieParser from 'cookie-parser'
import qs from 'qs';

import session from 'express-session';
import connectSQLite from 'connect-sqlite3';

import cloudinary from "cloudinary"
import fileupload from "express-fileupload"

import loginRouter from './routes/auth.routes'
import staticServer from './middleware/__server-static.middleware';
import { logRequests } from './middleware/logging'
import indexRouter from './routes/index.routes'
import workSpaceRouter from './routes/workspace.routes'
import eventRouter from './routes/events.routes'
import webPushRouter from './routes/push-subscription.routes';
import preferenceRouter from './routes/preferences.routes';
import exerciseRouter from './routes/exercises.routes';
import userRouter from './routes/user.routes';
import completeExerciseRouter from './routes/complete-exercise';
import preferenceFormRouter from './routes/preferencesForm.routes';
import profileRouter from './routes/profile.routes';
import federatedAuthRouter from './routes/federated.auth.routes';
import usersRouter from './routes/users.routes';
import { resolve } from 'path';
import configEnv from './config/env';

cloudinary.v2.config({
  cloud_name: configEnv.CLOUDINARY.CLOUD_NAME,
  api_key: configEnv.CLOUDINARY.API_KEY,
  api_secret: configEnv.CLOUDINARY.API_SECRET
})

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

// Set qs as query string parser
app.set('query parser', (query: string) => {
  return qs.parse(query, {
    plainObjects: true
  })
})

// Library Middleware
app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use(helmet({
  contentSecurityPolicy: false // Allow CDN's resources to be delivered
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
  createParentPath: true,
  limits: { fileSize: 25 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: "Archivo demasiado grande!"
}))

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
app.use(preferenceFormRouter)
app.use(profileRouter)
app.use(federatedAuthRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', webPushRouter);
app.use('/api/users/', userRouter);
app.use('/api/users/preferences', preferenceRouter);
app.use('/api/exercises/completed', completeExerciseRouter);
app.use('/api/exercises/readings', exerciseRouter);
app.use('/api/users/list', usersRouter)


export default app;
