import type { Request, Response } from 'express'
import { AuthRequest } from '../middleware/validate_jwt';

function renderTimer(req: AuthRequest, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        headerContentPartial: 'partials/timer-head.ejs',
        mainContentPartial: 'partials/timer.ejs',
        username: req.user?.name || "Desconocido"
    })
}

export { renderTimer };