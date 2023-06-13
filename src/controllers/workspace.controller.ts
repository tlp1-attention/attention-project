import type { Request, Response } from 'express'

function renderTimer(_req: Request, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        mainContentView: 'partials/timer.ejs',
    })
}

export { renderTimer };