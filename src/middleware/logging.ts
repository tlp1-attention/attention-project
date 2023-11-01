import morgan from 'morgan'
import { getStreamForLogFile } from '../utils/get-stream-for-log'
import envConfig from '../config/env'
import type { Request, Response, NextFunction } from 'express'

export const LOGGING_FOLDER = envConfig.LOGGING_DIR

export async function logRequests(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.headers);
    const stream = await getStreamForLogFile(LOGGING_FOLDER, 'access')

    const logger = morgan('combined', {
        stream: stream,
        skip: (req) => req.statusCode <= 299 && req.statusCode >= 200,
    })

    logger(req, res, next)
}
