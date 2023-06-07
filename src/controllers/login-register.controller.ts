import { Models } from '../db'
import { hashPassword, comparePassword } from '../utils/hash';
import type { Response, Request } from 'express'


const { Users } = Models;

async function loginController(req: Request, res: Response) {

    const { username, password } = req.body;


    const foundUser = await Users.findOne({
        where: {
            name: username,
        }
    });

    let isCorrectPassword;
    if (foundUser) isCorrectPassword = await comparePassword(password, foundUser.password);

    if (!isCorrectPassword) {
        return res.sendStatus(404);
    } else {
        return res.sendStatus(200);
    }
}

class ValidationError extends Error {}

class IncorrectRegisterError extends Error {}


async function registerController(req: Request, res: Response) {

    const { username, password, email } = req.body;

    const hashedPassword = await hashPassword(password);

    if (username == "" ||
        password == "" ||
        email == "") {

        throw new ValidationError('Incorrect register information');
    }

    const found = await Users.findAll({
        where: {
            name: username,
        }
    })

    if (found.length == 0) {
        await Users.create({
            name: username, 
            password: hashedPassword,
            email: email,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    
        return res.sendStatus(201);
    } else if (found.length == 1) {
        return res.sendStatus(409);
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
}

export {
    loginController,
    registerController
}