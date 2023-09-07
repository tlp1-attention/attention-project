import { JwtPayload } from 'jsonwebtoken'
import type { Request } from 'express'
import { Models} from '../database/models';
import type { Users as UsersType } from '../models/users'

const { Users } = Models;

type JWTTokenReq = JwtPayload & { id: number}

export interface AuthRequest extends Request {
    user?: UsersType,
}
/*
async function _validateToken(req: Request, _res: Response, next: NextFunction) {

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
*/