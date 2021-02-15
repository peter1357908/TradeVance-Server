import jwt from 'jwt-simple';
import dotenv from 'dotenv';

import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // `iat` stands for "issued at timestamp"
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

// signin() should only be called after verifying the credentials
export const signin = (req, res, next) => {
  // req.user comes from the passport middleware
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(422).send('All fields must be filled out.');
    return;
  }

  // TODO: take advantage of the `unique: true` option from the User schema?
  // TODO: findOne that matches **either email or username**?
  User.findOne({ 'profile.email': email })
    .then((foundUserWithEmail) => {
      if (foundUserWithEmail) {
        res.status(409).send('Submitted email is already in use');
      } else {
        User.findOne({ 'auth.username': username })
          .then((foundUserWithUsername) => {
            if (foundUserWithUsername) {
              res.status(409).send('Submitted username is already in use');
            } else {
              const user = new User();
              user.auth.username = username;
              user.profile.email = email;
              // the password will be salted and hashed pre-save; see user_model.js
              user.auth.password = password;
              console.log(user);
              user.save()
                .then((savedUser) => {
                  res.send({ token: tokenForUser(savedUser) });
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
