import express from 'express'
import { sequelize, Models } from './db';
import path from 'path';
import morgan  from 'morgan'

const app = express();

let id_usuario = 1;

const PORT = process.env.PORT || 8080;

// Sequelize Models
const { usuario: Usuario } = Models;

// Middleware
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));

class ValidationError extends Error {}

// Routes
app.post('/register/', async (req, res) => {

    const { username, password, email } = req.body;

    if (username == "" ||
        password == "" ||
        email == "") {

        throw new ValidationError('Información de registro incorrecta.');
    }

    await Usuario.create({
        id_usuario: ++id_usuario,
        nombre_usuario: username,
        contrasenia: password,
        correo_electronico: email
    });

    res.sendStatus(200);
});

class IncorrectLoginError extends Error {}

app.get('/login/', async (req, res) => {

    const { username, password, email } = req.body;

    const finded = await Usuario.findAll({
        where: {
            nombre_usuario: username,
            contrasenia: password,
            correo_electronico: email
        }
    })

    if (finded.length > 1) {
        throw new IncorrectLoginError('Hay más de un usuario con el mismo nombre.')
    } else if (finded.length == 1) {
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));