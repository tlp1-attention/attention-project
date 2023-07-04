import type { Request, Response } from 'express'
import { AuthRequest } from '../middleware/validate_jwt';

// Render timer view on the workspace
function renderTimer(req: AuthRequest, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        headerContentPartial: 'partials/timer-head.ejs',
        mainContentPartial: 'partials/timer.ejs',
        username: req.user?.name || "Nombre de usuario"
    })
}

// Render events view on the workspace
function renderEvents(req: AuthRequest, res: Response) {
    res.render('layout-events', {
        title: 'Agenda',
        mainContentPartial: 'partials/events.ejs',
        username: req.user?.name || "Nombre de usuario",
    })
}

function renderReading(req: AuthRequest, res: Response) {
    res.render('layout-readings', {
        title: 'Lectura',
        mainContentPartial: 'partials/.ejs',
        username: req.user?.name || "Nombre de usuario",
    })
}

export { renderTimer, renderEvents, renderReading };