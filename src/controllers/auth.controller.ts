import { Models } from '../database/models'
import { hashPassword } from '../utils/hash'
import type { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { userService } from '../services/user.service'
import { createToken } from '../utils/token'
import configEnv from '../config/env';


const { Users, Preferences } = Models

async function loginController(req: Request, res: Response) {
    const { username, password } = req.body

    try {
        const loggedUser = await userService.login(username, password)

        if (!loggedUser) {
            return res.status(404).json({
                message: 'Usuario o contraseña incorrectos',
            })
        }

        const { id } = loggedUser

        const token = await createToken(id)

        return res.status(200).json({
            message: 'Sesión iniciada correctamente',
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function registerController(req: Request, res: Response) {
    const { username, password, email } = req.body

    try {
        const registeredUser = await userService.register(
            username,
            email,
            password
        )

        if (!registeredUser) {
            return res.status(409).json({
                message: 'Usuario o correo electrónico no disponibles',
            })
        }
        const { id } = registeredUser

        const token = await createToken(id)

        return res.status(201).json({
            message: 'Registrado exitosamente',
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
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

async function getUserInfo(req: Request, res: Response) {
    const token: any = req.headers.authorization

    if (!token) {
        res.status(401).send({ message: 'No se ha proporcionado el token!' })
    }

    try {
        const decodedToken: any = jwt.verify(token, configEnv.SECRET)

        const user = await Users.findByPk(decodedToken.id, {
            include: {
                model: Preferences,
                as: "preferences",
                attributes: ["time_day", "subject", "contact", "people", "contact_type"]
            }
        })

        if (!user) {
            res.status(404).send("No se ha encontrado el usuario!")
        }

        return res.status(200).send(user)
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function updateUserInfo(req: Request, res: Response) {
    const token: any = req.headers.authorization

    if (!token) {
        res.status(401).send({ message: 'No se ha proporcionado el token!' })
    }

    try {
        const decodedToken: any = jwt.verify(token, configEnv.SECRET)

        const user = await Users.findByPk(decodedToken.id)

        if (!user) {
            res.status(404).send("No se ha encontrado el usuario!")
        }

        const updatedUser = await user.update(req.body)

        if (!updatedUser) {
            res.status(404).send("No se ha podido actualizar la información del usuario!")
        }

        return res.status(200).send(updatedUser)
    } catch (err) {
        console.error(err);
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

}

export {
    loginController,
    registerController,
    changePasswordController,
    logoutController,
    getUserInfo,
    updateUserInfo,
}
