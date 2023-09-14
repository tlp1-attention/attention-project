import type { Request, Response } from 'express'
import { AuthRequest } from '../middleware/validate_jwt';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type RequestMaybeAuthed = Optional<AuthRequest, 'user'>

function renderIndex(req: RequestMaybeAuthed, res: Response) {
    res.render('index', {
        username: req.user?.name || false
    })
}

export { renderIndex };