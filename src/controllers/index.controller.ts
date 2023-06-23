import type { Request, Response } from 'express'
import { AuthRequest } from '../middleware/validate_jwt';

function renderIndex(req: Request, res: Response) {
    res.render('index', {
        username: false
    });
}

function renderIndexWithAuth(req: AuthRequest, res: Response) {
    res.render('index', {
        username: req?.user?.name
    });
}

export { renderIndex, renderIndexWithAuth };