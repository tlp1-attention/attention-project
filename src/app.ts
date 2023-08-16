import express from 'express'
import morgan  from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './db';
import cookieParser from 'cookie-parser'

import { passport } from './middleware/passport';
import session from 'express-session';
import connectSQLite from 'connect-sqlite3';

import loginRouter from './routes/auth.routes'
import staticServer from './middleware/__server-static.middleware';
import indexRouter from './routes/index.routes'
import workSpaceRouter from './routes/workspace.routes'
import eventRouter from './routes/events.routes'
import webPushRouter from './routes/push-subscription.routes';

const app = express();
const SessionStore = connectSQLite(session);

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
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: true
  },
  store: new SessionStore({
    db: 'session.db',
    dir: './session-store'
  }) as session.Store
}));
app.use(passport.session());

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
// 
