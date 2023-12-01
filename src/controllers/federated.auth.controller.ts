import { Request, Response } from "express";
import { OAuth2Client} from 'google-auth-library'
import env from "../config/env";
import { userService } from "../services/user.service";
import { createToken } from "../utils/token";

const client = new OAuth2Client(
    env.GOOGLE.CLIENT_ID,
    env.GOOGLE.CLIENT_SECRET,
    'postmessage'
);

export async function loginWithGoogle(req: Request, res: Response) {
    const { code } = req.body;
    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: env.GOOGLE.CLIENT_ID
    });

    if (!ticket) {
        return res.status(400).json({
            message: 'No se pudo verificar el token.'
        });
    }


    const payload = ticket.getPayload();

    const user = await userService.findOrCreateFederatedCredential({
        name: payload?.name,
        email: payload?.email,
        profileImage: payload.picture,
        password: 'google',
    }, {
        provider: payload.iss,
        subject: payload.sub
    });

    if (!user) {
        return res.status(400).json({
            message: 'No se pudo crear el usuario.'
        });
    }

    const token = await createToken(user.id);

    return res.status(200).json({
        message: 'Inicio de sesión con Google exitoso.',
        token,
    });

}