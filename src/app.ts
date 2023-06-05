import express from 'express'
import { Models } from './db';
import morgan  from 'morgan'
import { hashPassword, comparePassword } from './utils/hash'


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

    const hashedPassword = await hashPassword(password);

    if (username == "" ||
        password == "" ||
        email == "") {

        throw new ValidationError('Incorrect register information');
    }

    const found = await Usuario.findAll({
        where: {
            nombre_usuario: username,
        }
    })

    if (found.length == 0) {
        await Usuario.create({
            nombre_usuario: username, 
            contrasenia: hashedPassword,
            correo_electronico: email,
        });
    
        return res.sendStatus(201);
    } else if (found.length == 1) {
        return res.sendStatus(409);
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
});

app.head('/login/:username/:password', async (req, res) => {

    const { username, password } = req.params;

    const foundUser = await Usuario.findOne({
        where: {
            nombre_usuario: username,
        }
    });

    const isCorrectPassword = await comparePassword(password, foundUser.contrasenia);

    if (!isCorrectPassword) {
        return res.sendStatus(404);
    } else {
        return res.sendStatus(200);
    }
})



app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));