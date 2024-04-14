import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import configEnv from '../config/env'
import { AuthRequest } from '../interfaces/auth-request'
import { Users } from '../models/users'
import { userService } from '../services/user.service'
import { uploadImage } from '../utils/file-uploading'

export function getUserByToken(req: Request, res: Response) {
    res.status(200).json({
        user: (req as AuthRequest).user,
    })
}

export async function getListUsers(req: Request, res: Response) {
    const user = req.user
    try {
        const listUsers = await userService.findUsersWithMatch(user.id)

        if (listUsers.length === 0) {
            res.status(404).send({
                status: 404,
                message: '¡No se ha encontrado ningun usuario!',
            })
        }

        res.status(200).send(listUsers)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// TODO: Make this controller use the userService and `createToken` function
export async function updateUserInfo(req: Request, res: Response) {
    const token: any = req.headers.authorization
    if (!token) {
        res.status(401).send({ message: 'No se ha proporcionado el token!' })
    }

    try {
        const decodedToken: any = jwt.verify(token, configEnv.SECRET)

        const user = await Users.findByPk(decodedToken.id)

        if (!user) {
            res.status(404).send('No se ha encontrado el usuario!')
        }

        let imageUrl = user.profileImage ?? '';

        if (
            (req as any).hasOwnProperty('files') &&
            (req as any).files.profileImage
        ) {
            const image = await uploadImage((req as any).files.profileImage)
            imageUrl = image.secure_url
        }

        const updatedUser = await user.update({
            ...req.body,
            profileImage: imageUrl,
        })

        if (!updatedUser) {
            res.status(404).send({
                message:
                    'No se ha podido actualizar la información del usuario!',
            });
        }

        return res.status(200).send(updatedUser)
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}
