import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user_model';

const localOptions = { usernameField: 'username' };

// "pass in the jwt in an `authorization` header so passport can find it there" ...???
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // TODO: what about `dotenv.config({ silent: true });`??
  secretOrKey: process.env.AUTH_SECRET,
};

// username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify this username and password, call done() with the user
  // if it is the correct username and password
  // otherwise, call done() with false
  User.findOne({ 'auth.username': username }, (err, foundUser) => {
    if (err) { return done(err); }

    if (!foundUser) { return done(null, false); }

    // compare passwords - is `password` equal to user.auth.password?
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

export const requireSignin = passport.authenticate('local', { session: false });
export const requireAuth = passport.authenticate('jwt', { session: false });
