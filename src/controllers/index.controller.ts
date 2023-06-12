import type { Request, Response } from 'express'

function renderIndex(_req: Request, res: Response) {
    res.render('index', {
        registered: false
    });
}

export default renderIndex;