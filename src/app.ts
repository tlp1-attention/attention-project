import express from 'express'
import { sequelize, Models } from './db';
import path from 'path';
import morgan  from 'morgan'

const app = express();

const PORT = process.env.PORT || 8080;

// Sequelize Models
const { usuario: Usuario } = Models;

// Middleware
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));

class ValidationError extends Error {}

class IncorrectRegisterError extends Error {}

// Routes
app.post('/register/', async (req, res) => {

    const { username, password, email } = req.body;

    if (username == "" ||
        password == "" ||
        email == "") {

        throw new ValidationError('Información de registro incorrecta.');
    }

    const finded = await Usuario.findAll({
        where: {
            nombre_usuario: username,
        }
    })

    if (finded.length == 0) {
        await Usuario.create({
            nombre_usuario: username, 
            contrasenia: password,
            correo_electronico: email,
        });
    
        return res.sendStatus(201);

    } else if (finded.length == 1) {
        return res.sendStatus(409);
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
});

app.get('/login', async (req, res) => {

    const { username, password, email } = req.body;

    let findedUser;
    if (!email) {
        findedUser = await Usuario.findOne({
            where: {
                nombre_usuario: username,
                contrasenia: password,
            },
        });
    } else {
        findedUser = await Usuario.findOne({
            where: {
                correo_electronico: email,
                contrasenia: password,
            }
        })
    }

    if (!findedUser) {
        return res.sendStatus(404);
    } else {
        return res.sendStatus(200);
    }
})



app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));