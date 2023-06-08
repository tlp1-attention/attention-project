import type { Request, Response, NextFunction } from "express";
import express from 'express';
import { readdir } from 'fs/promises';
import { extname, basename } from 'path';

async function staticServerMiddleware(req: Request, res: Response, next: NextFunction) {

    const views = await readdir('./src/views');

    const templates = views.filter(view => extname(view) === '.ejs')
                      .map(view => basename(view).replace(extname(view), '.html'));

    if (templates.includes(req.url.slice(1)) || req.url == '/') {
        return next();
    } else {
        return express.static('./public')(req, res, next);
    }

}

export default staticServerMiddleware;