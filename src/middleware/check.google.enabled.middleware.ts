import { Request, Response, NextFunction } from 'express'
import env from '../config/env'

export function checkGoogleEnabledMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (env.GOOGLE.ENABLED){
        return next();
    }
    return res.status(400).json({
        message: 'Inicio de sesión con Google no habilitado.'
    });
}
