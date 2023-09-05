import morgan from 'morgan'
import { createWriteStream } from 'fs'
import { appendFile } from 'fs/promises'
import { resolve } from 'path'
import type { Request, Response } from 'express'
import { NextFunction } from 'express'

const SERVER_LOG_PATH = resolve('./logs/server.txt')
const ERROR_LOG_PATH = resolve('./logs/errors.txt')

export const loggerMiddleware = morgan('combined', {
    stream: createWriteStream(resolve(SERVER_LOG_PATH))
})

export function errorLoggerMiddleware(
    err: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    if (!err) next()
    const errorEntry = `${err.name}: ${err.cause}\n${err.stack}`
    appendFile(ERROR_LOG_PATH, errorEntry)
}

export const logError = (err: Error) => {
    const errorEntry = `${err.name}: ${err.cause}\n${err.stack}`
    appendFile(ERROR_LOG_PATH, errorEntry);
    console.error(err);
}
