import { Response} from 'express';
import { AuthRequest } from '../interfaces/auth-request';

export function getUserByToken(req: AuthRequest, res: Response) {
    res.status(200).json({
        user: req.user
    });
}