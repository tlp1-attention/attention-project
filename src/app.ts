import express from 'express'
import morgan  from 'morgan'
import path from 'path'
import loginRouter from './routes/login-register.routes';
import staticServer from './middleware/server-static.middleware';
import indexRouter from './routes/index.routes'

const app = express();

const PORT = process.env.PORT || 8080;

// Set ejs as template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(loginRouter);
app.use(staticServer);
app.use(indexRouter);


app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});