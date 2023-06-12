import { Models } from '../db'
import { hashPassword, comparePassword } from '../utils/hash';
import type { Response, Request } from 'express'

const { Users } = Models;

async function loginController(req: Request, res: Response) {
    const { username, password } = req.body;

    let foundUser;
    try {
        foundUser = await Users.findOne({
            where: {
                name: username,
            }
        });
    } catch (_error) {
        return res.sendStatus(500);
    }

    let isCorrectPassword: boolean;
    if (foundUser) isCorrectPassword = await comparePassword(password, foundUser.password);

    if (!isCorrectPassword) {
        return res.sendStatus(400);
    } else {
        return res.sendStatus(200);
    }
}

class IncorrectRegisterError extends Error {}

async function registerController(req: Request, res: Response) {

    const { username, password, email } = req.body;

    const hashedPassword = await hashPassword(password);

    let found
    try {
        found = await Users.findAll({
            where: {
                name: username,
            }
        })
    } catch (_error) {
        res.sendStatus(500);
    }

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
        return res.sendStatus(400);
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
}

export {
    loginController,
    registerController
}