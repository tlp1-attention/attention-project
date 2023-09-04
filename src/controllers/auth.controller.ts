import { Models } from '../database/models'
import { hashPassword } from '../utils/hash'
import type { Response, Request, NextFunction } from 'express'
import { Op } from 'sequelize'
import { passport } from '../middleware/passport'
import type { Users as TUsers } from '../models/users'

const { Users } = Models

const loginController = passport.authenticate('local', {
    successRedirect: '/workspace/timer',
})

class IncorrectRegisterError extends Error {}

async function registerController(req: Request, res: Response) {
    const { username, password, email } = req.body

    const hashedPassword = await hashPassword(password)

    let found: TUsers[]
    try {
        found = await Users.findAll({
            where: {
                [Op.or]: {
                    name: username,
                    email: email,
                },
            },
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

    if (found.length == 0) {
        const _newUser = await Users.create({
            name: username,
            password: hashedPassword,
            email: email,
        })

        return res.status(201).json({
            message: 'Registrado exitosamente',
        })
    } else if (found.length == 1) {
        return res.status(409).json({
            message: 'Usuario o correo electrónico no disponibles',
        })
    } else {
        throw new IncorrectRegisterError(
            'Demasiados usuarios con el mismo nombre.'
        );
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

        return res.status(201).json({
            message: 'Contraseña cambiada exitosamente',
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: 'Error interno del servidor',
        })
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
