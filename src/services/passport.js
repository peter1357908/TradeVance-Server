import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user_model';

const localOptions = { usernameField: 'username' };

// "pass in the jwt in an `authorization` header so passport can find it there" ...???
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET || 'test_auth_secret',
};

// username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify this username and password combination , call done() with
  // the user if the combination is valid
  // otherwise, call done() with false
  User.findOne({ 'auth.username': username }, (err, foundUser) => {
    if (err) { return done(err); }

    if (!foundUser) { return done(null, false); }

    return foundUser.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      } else if (!isMatch) {
        return done(null, false);
      } else {
        return done(null, foundUser);
      }
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call done() with that user
  // otherwise, call done() with `false`
  // note that `payload` is the token object return by
  // `tokenForUser()` at `AuthController.signIn()`
  User.findById(payload.sub, (err, foundUser) => {
    if (err) {
      done(err);
    } else if (foundUser) {
      done(null, foundUser);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);

export const requireSignIn = passport.authenticate('local', { session: false });
export const requireAuth = passport.authenticate('jwt', { session: false });
