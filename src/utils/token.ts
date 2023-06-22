import jwt from 'jsonwebtoken'

function createToken(id: number) {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_KEY, {
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