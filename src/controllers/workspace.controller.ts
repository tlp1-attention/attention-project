import type { Request, Response } from 'express'

function renderTimer(_req: Request, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        headerContentPartial: 'partials/timer-head.ejs',
        mainContentPartial: 'partials/timer.ejs',
    })
}

export { renderTimer };