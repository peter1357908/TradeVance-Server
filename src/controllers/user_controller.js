import jwt from 'jwt-simple';
import dotenv from 'dotenv';

import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a `user` object; currently only uses the
// `id` field of the `user` object.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // `iat` stands for "issued at timestamp"
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

// signIn() generates a token for the signed-in user and send it along
// the signed-in user's profile information
// signIn() should only be used as the chained method after the
// middleware requireSignIn(); see its usage in router.js
export const signIn = (req, res, next) => {
  // req.user comes from the passport middleware
  res.send({ token: tokenForUser(req.user), user: req.user });
};

// signUp() validates the sign-up information provided; if it is valid,
// the information is recorded in the database and a token is generated
// and sent (i.e. the user will be automatically "signed in"),
// along the signed-up user's profile information
export const signUp = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(422).send('All fields must be filled out.');
    return;
  }

  // TOTHINK: take advantage of the `unique: true` option from the User schema?
  // TOTHINK: findOne that matches **either email or username**?
  User.findOne({ 'auth.username': username })
    .then((foundUserWithUsername) => {
      if (foundUserWithUsername) {
        res.status(409).send('Submitted username is already in use');
      } else {
        User.findOne({ 'profile.email': email })
          .then((foundUserWithEmail) => {
            if (foundUserWithEmail) {
              res.status(409).send('Submitted email is already in use');
            } else {
              const user = new User();
              user.auth.username = username;
              // the password will be salted and hashed pre-save; see user_model.js
              user.auth.password = password;

              user.profile.email = email;
              user.save()
                .then((savedUser) => {
                  res.send({ token: tokenForUser(savedUser), user: savedUser });
                })
                .catch((error) => {
                  res.status(500).json({ error });
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// getOwnProfile() returns the signed-in user's profile information
// getOwnProfile() should only be used as the chained method after the
// middleware requireAuth(); see its usage in router.js
export const getOwnProfile = (req, res, next) => {
  // remember, req.user is from the middleware requireAuth()
  res.send({ user: req.user });
};