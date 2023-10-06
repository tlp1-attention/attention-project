import jwt from 'jsonwebtoken'
import env from '../config/env';

function createToken(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, env.SECRET, {
            expiresIn: '1h',
        }, (err, token) => {

            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

export { createToken };