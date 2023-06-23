import { Models } from '../db'
import { hashPassword, comparePassword } from '../utils/hash';
import { createToken } from '../utils/token';
import type { Response, Request } from 'express'
import { Op } from 'sequelize'


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
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }

    let isCorrectPassword: boolean;
    if (foundUser) isCorrectPassword = await comparePassword(password, foundUser.password);

    if (!isCorrectPassword) {
        return res.sendStatus(400);
    } else {
        const token = await createToken(foundUser.id);

        return res.cookie('session-token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).sendStatus(200);
    }
}

class IncorrectRegisterError extends Error {}

async function registerController(req: Request, res: Response) {

    const { username, password, email } = req.body;

    const hashedPassword = await hashPassword(password);

    let found;
    try {
        found = await Users.findAll({
            where: {
                [Op.or]: {
                    name: username,
                    email: email
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    if (found.length == 0) {
        const newUser = await Users.create({
            name: username, 
            password: hashedPassword,
            email: email,
        });
    
        const token = await createToken(newUser.id);

        return res.status(201).json({ token });

    } else if (found.length == 1) {
        return res.sendStatus(400);
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
}

// change-password
async function changePasswordController(req, res) {

    const { email, password: newPassword } = req.body;
    
    try {
        const foundUser = await Users.findOne({
            where: {
                email
            }
        })
    
        if (!foundUser) {
            return res.sendStatus(400);
        }

        const hashedPassword = await hashPassword(newPassword);

        foundUser.update({
            password: hashedPassword,
            updatedAt: new Date()
        });
        
        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export {
    loginController,
    registerController,
    changePasswordController
}
