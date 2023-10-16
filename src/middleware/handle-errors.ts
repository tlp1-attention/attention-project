import { getStreamForLogFile } from '../utils/get-stream-for-log.js'
import envConfig from '../config/env.js'
import type { NextFunction, Request, Response } from 'express'

const LOGGING_DIR = envConfig.LOGGING_DIR


async function logError(err: Error, req: Request) {
    const stream = await getStreamForLogFile(LOGGING_DIR, 'error')
    const dateToPrepend = `${new Date().toISOString()}`
    const reqInfo = req.body
    const errorOutput = `[${dateToPrepend}] ${err.message}-${err.stack}\nRequest Body: ${reqInfo}`

    stream.write(errorOutput)
}

export async function handleErrors(
    err: Error | { status: number, message: string },
    req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof Error) {
        console.error(err)
        logError(err, req)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    } else {
        res.status(err.status).json({
            message: err.message,
        });
    }
}
