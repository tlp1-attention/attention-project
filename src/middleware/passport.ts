import passport from 'passport'
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    VerifiedCallback,
} from 'passport-jwt'
import { AuthRequest } from '../interfaces/auth-request'
import type { Users as TUsers } from '../models/init-models'
import { JwtPayload } from 'jsonwebtoken'
import env from '../config/env'
import { Request, Response, NextFunction } from 'express'
import { userService } from '../services/user.service'

async function verifyUser(
    _req: Request,
    jwtPayload: JwtPayload,
    done: VerifiedCallback
) {
    const { id } = jwtPayload

    try {
        const foundUser = await userService.findById(id)

        done(null, foundUser)

    } catch (err) {
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
            ignoreExpiration: true,
            
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


export async function verifySession(req: Request, res: Response, next: NextFunction) {
    const verifyExistingToken = passport.authenticate('jwt', {
        passReqToCallback: true,
        failureMessage: true
    }, (err: Error, user: TUsers, info: string) => {
        if (err) next(err);
        if (!user) return res.status(401).json({
            message: 'Token faltante'
        });

        (req as AuthRequest).user = user;
        next();
    });

    return verifyExistingToken(req, res, next);
}

