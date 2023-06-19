import express from 'express'
import morgan  from 'morgan'
import loginRouter from './routes/auth.routes';
import staticServer from './middleware/server-static.middleware';
import indexRouter from './routes/index.routes'
import helmet from 'helmet'
import cors from 'cors'
import workSpaceRouter from './routes/workspace.routes'
import { sequelize } from './db';

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

// Custom middleware
app.use(staticServer);

// Routes
app.use(loginRouter);
app.use(indexRouter);
app.use(workSpaceRouter);


app.listen(PORT, () => {
    
    console.log(`Server listening in port: http://localhost:${PORT}`);
});