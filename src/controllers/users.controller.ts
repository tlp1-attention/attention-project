import { Request, Response } from "express";
import { userService } from "../services/user.service";

export async function getListUsers(req: Request, res: Response) {
    const { id } = req.params
    try {
        const listUsers = await userService.findAllUsers()

        if (listUsers.length === 0) {
            res.status(404).send({
                status: 404,
                message: 'No se ha encontrado ningun usuario!'
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