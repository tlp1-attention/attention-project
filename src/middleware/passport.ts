import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword, hashPassword } from '../utils/hash';
import type { Users as TUsers } from '../models/init-models';
import { Router } from 'express';
import { Models } from '../db';

const { Users } = Models;

async function verifyUser(username: string, password: string, cb: (...args:any[]) => void) {
    let foundUser: TUsers | undefined;
    console.log('User: ', username);
    console.log('Password: ', password);
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
passport.use(new LocalStrategy(verifyUser));

passport.serializeUser(function(user: TUsers, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

export { passport };