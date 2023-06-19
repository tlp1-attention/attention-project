import jwt, { JwtPayload } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import { Models} from '../db';
import type { Users as UsersType } from '../models/users'

const { Users } = Models;

type JWTTokenReq = JwtPayload & { id: number}

export type AuthRequest = Request & { user: UsersType }

async function validateToken(req: Request, res: Response, next: NextFunction) {

    const { token } = req.headers;


    try {

        const payload = jwt.verify(token as string, process.env.SECRET_KEY) as JWTTokenReq;

        if ('id' in (payload as object)) {

            const { id } = payload; 

            const foundUser = await Users.findByPk(id);

            (req as AuthRequest).user = foundUser;

            next();
            
        } else {
            throw ({ status: 401 });
        }

    } catch(err) {

        if (err.status == 401) {
            return res.sendStatus(401);
        }

        res.sendStatus(500);
    }

}

export default validateToken;