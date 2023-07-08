import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import type { Request } from 'express';
import { comparePassword, hashPassword } from '../utils/hash';
import type { Users as TUsers } from '../models/init-models';
import { Models } from '../db';

const { Users } = Models;

async function verifyUser(req: Request, _username: string, _password: string, cb: (...args:any[]) => void) {
    
    const { username, password } = req.body;
    
    let foundUser: TUsers | undefined;
    try {
        foundUser = await Users.findOne({
            where: {
                name: username,
            }
        });
    } catch (err) {
        console.error(err);
        return cb(err);
    }

    let isCorrectPassword: boolean;
    if (foundUser) isCorrectPassword = await comparePassword(password, foundUser.password);

    if (!isCorrectPassword) {
        return cb(null, false, { message: 'Incorrect username or password'});
    }

    return cb(null, foundUser);
}

// Use passport's Local Strategy to verify 
// incoming username and password against database
passport.use(new LocalStrategy({
  passReqToCallback: true
} ,verifyUser));

passport.serializeUser(function(user: TUsers, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });

});

export { passport };