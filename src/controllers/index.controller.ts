import type { Response } from 'express'
import { AuthRequest } from '../interfaces/auth-request'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type RequestMaybeAuthed = Optional<AuthRequest, 'user'>

function renderIndex(req: RequestMaybeAuthed, res: Response) {
    res.render('index', {
        username: req.user?.name || false,
    })
}

export { renderIndex }
