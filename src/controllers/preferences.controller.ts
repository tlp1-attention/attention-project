import { userService } from "../services/user.service";
import type { Response } from "express";
import { AuthRequest } from "../interfaces/auth-request";

export async function updatePreferencesForUser(req: AuthRequest, res: Response) {
    const { id: userId } = req.user;

    try {
        

    } catch(err) {

    }

}