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

// Routes
app.post('/register/', async (req, res) => {

    const { username, password, email } = req.body;

    console.log("Registered: ", req.body);

    await Usuario.create({
        id_usuario: ++id_usuario,
        nombre_usuario: username,
        contrasenia: password,
        correo_electronico: email
    });

    res.sendStatus(200);
})

app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));