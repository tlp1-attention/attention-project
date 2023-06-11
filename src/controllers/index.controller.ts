import type { Request, Response } from 'express'

function renderIndex(_req: Request, res: Response) {
    
    console.log('Llegado')
    res.render('index', {
        registered: false
    });
}

export default renderIndex;