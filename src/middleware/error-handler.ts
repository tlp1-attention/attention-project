import { ErrorRequestHandler, Request, Response } from "express";

export const handleInternalErrors: ErrorRequestHandler = (err, req, res, next) => {
    if (!err) next();
    
    res.status(500).json({
        message: 'Error interno del servidor'
    })
}