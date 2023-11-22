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

function verifyToken<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(decoded as T);
            }
        })
    })
}

export { createToken, verifyToken };