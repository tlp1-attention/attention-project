import { Models } from '../db'
import { hashPassword } from '../utils/hash'
import type { Response, Request, NextFunction } from 'express'
import { Op } from 'sequelize'
import { passport } from '../middleware/passport'
import { createToken } from '../utils/token'

const { Users } = Models

const loginController = passport.authenticate('local', {
    successRedirect: '/workspace/timer',
    session: true,
});

class IncorrectRegisterError extends Error {}

async function registerController(req: Request, res: Response) {
    const { username, password, email } = req.body

    const hashedPassword = await hashPassword(password)

    let found
    try {
        found = await Users.findAll({
            where: {
                [Op.or]: {
                    name: username,
                    email: email,
                },
            },
        })
        console.log(found)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

    if (found.length == 0) {
        const { id: userId } = await Users.create({
            name: username,
            password: hashedPassword,
            email: email,
        })

        const token = createToken(userId)

        res.cookie('session-cookie', token)

        return res.sendStatus(201)
    } else if (found.length == 1) {
        return res.sendStatus(400)
    } else {
        throw new IncorrectRegisterError('Too many users with the same name.')
    }
}

// Change password controller
async function changePasswordController(req: Request, res: Response) {
    const { email, password: newPassword } = req.body

    try {
        const foundUser = await Users.findOne({
            where: {
                email,
            },
        })

        if (!foundUser) {
            return res.sendStatus(400)
        }

        const hashedPassword = await hashPassword(newPassword)

        foundUser.update({
            password: hashedPassword,
            updatedAt: new Date(),
        })

        return res.sendStatus(201)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

async function logoutController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
}

export {
    loginController,
    registerController,
    changePasswordController,
    logoutController,
}
