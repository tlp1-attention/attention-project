import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import { Models} from '../db';
import type { Users as UsersType } from '../models/users'

const { Users } = Models;

type JWTTokenReq = JwtPayload & { id: number}

export type AuthRequest = Request & { user: UsersType }

async function _validateToken(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies['session-token'];

    if (!token || token.length == 0) throw ({ status: 401} );

    const payload = jwt.verify(token as string, process.env.SECRET_KEY) as JWTTokenReq;

    if ('id' in (payload as object)) {
            const { id } = payload; 
            const foundUser = await Users.findByPk(id);

            (req as AuthRequest).user = foundUser;

            next();   
    } else {
        throw ({ status: 401 });
    }
}

// Verifies if a request has a session token and responds with an Unauthorized status code 
// when it does not
async function validateToken(req: Request, res: Response, next: NextFunction) {

    try {
        await _validateToken(req, res, next);

    } catch(err) {
        console.error(err);

        if (err.status == 401 || err instanceof JsonWebTokenError) {
            return res.sendStatus(401);
        }

        res.sendStatus(500);
    }
}

// Verifies a JWT without responding if it's not present
// To use when an user can interact with a route even if it's not logged in
async function verifySession(req: Request, res: Response, next: NextFunction) {
    try {
        await _validateToken(req, res, next);
    } catch(err) {
        // Check if the exception has been thrown by _validateToken's 
        // body with status == 401. If not, then throw to propagate
        // bugs
        if (err.status !== 401) {
            throw err;
        }
    } finally {
        next();
    }
}

export {
    verifySession,
    validateToken
};