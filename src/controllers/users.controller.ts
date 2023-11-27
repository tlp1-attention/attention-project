import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { AuthRequest } from '../interfaces/auth-request';

export function getUserByToken(req: Request, res: Response) {
    res.status(200).json({
        user: (req as AuthRequest).user
    });
}

export async function getListUsers(_: Request, res: Response) {
    try {
        const listUsers = await userService.findAllUsers()

        if (listUsers.length === 0) {
            res.status(404).send({
                status: 404,
                message: '¡No se ha encontrado ningun usuario!'
            })
        }

        res.status(200).send(listUsers);

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}