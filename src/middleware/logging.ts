import { Request } from 'express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path'
import morgan, { FormatFn } from 'morgan'
import { resolve } from 'path'

const LOG_PATH = resolve('./logs/');

if (!existsSync(LOG_PATH)) {
    mkdirSync(LOG_PATH);
}
// @ts-ignore
export const loggingMiddleware = morgan('combined', {
    stream: createWriteStream(join(LOG_PATH, './requests.log'), {
        flags: 'a',
    }),
    skip: (req: Request, _res: Response) => req.statusCode > 200
});