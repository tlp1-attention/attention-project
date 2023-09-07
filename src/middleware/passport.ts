import passport from 'passport'
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    VerifiedCallback,
} from 'passport-jwt'
import type { Users as TUsers } from '../models/init-models'
import { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import env from '../config/env'
import { Request } from 'express'
import { userService } from '../services/user.service'

async function verifyUser(
    req: Request,
    jwtPayload: JwtPayload,
    done: VerifiedCallback
) {
    console.log('Request Headers: ', req.headers)
    const { id } = jwtPayload

    try {
        const foundUser = await userService.findById(id)

        done(null, foundUser)
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            done(err, null, {
                message: 'El token ha expirado',
            })
        }

        done(err, null, {
            message: 'Hubo un error al verificar el token',
        })
    }
}

// Use passport's Local Strategy to verify
// incoming username and password against database
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
            secretOrKey: env.SECRET,
            passReqToCallback: true,
        },
        verifyUser
    )
)

passport.serializeUser(function (user: TUsers, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, name: user.name })
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

const verifySession = passport.authenticate('jwt', {
  passReqToCallback: true
});

export { verifySession }
