import express from 'express'
import morgan  from 'morgan'
import loginRouter from './routes/login-register.route';

const app = express();

const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(loginRouter);


app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));