import type { Response } from 'express'
import { AuthRequest } from '../interfaces/auth-request'
import { exerciseService } from '../services/exercises.service'

// Render timer view on the workspace
function renderTimer(req: AuthRequest, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        headerContentPartial: 'partials/timer-head.ejs',
        mainContentPartial: 'partials/timer.ejs',
        username: req.user?.name || 'Usuario',
    })
}

// Render events view on the workspace
function renderEvents(req: AuthRequest, res: Response) {
    res.render('layout-events', {
        title: 'Agenda',
        mainContentPartial: 'partials/events.ejs',
        username: req.user?.name || 'Usuario',
    })
}

function renderReadingList(req: AuthRequest, res: Response) {
    res.render('layout-readings', {
        title: 'Lectura',
        mainContentPartial: 'partials/reading-list.ejs',
        username: req.user?.name || 'Usuario',
    })
}

async function renderReading(req: AuthRequest, res: Response) {
    const { readingId } = req.params;

    const reading = await exerciseService.findById(
        parseInt(readingId)
    );

    res.render('layout-readings', {
        title: 'Lectura',
        mainContentPartial: 'partials/reading.ejs',
        username: req.user?.name || 'Usuario',
        reading
    })
}

export { renderEvents, renderReadingList, renderTimer, renderReading  }
