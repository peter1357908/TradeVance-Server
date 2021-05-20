import jwt from 'jwt-simple';

import User from '../../models/user_model';

// encodes a new token for a `user` object; currently only uses the
// `id` field of the `user` object.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // `iat` stands for "issued at timestamp"
  return jwt.encode({ sub: user._id, iat: timestamp }, process.env.AUTH_SECRET || 'test_auth_secret' );
}

// signIn() generates a token for the signed-in user and send it back
// signIn() should only be used as the chained method after the
// middleware requireSignIn(); see its usage in router.js
export const signIn = (req, res, next) => {
  // req.user comes from the passport middleware
  res.send({ token: tokenForUser(req.user) });
};

// signUp() validates the sign-up information provided; if it is valid,
// the information is recorded in the database and a token is generated
// and sent back (i.e. the user will be automatically "signed in").
export const signUp = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(422).send('All fields must be filled out.');
    return;
  }

  // TOTHINK: take advantage of the `unique: true` option from the User schema?
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
              User.create({
                auth: {
                  username,
                  password,
                },
                profile: {
                  email,
                },
              })
              .then((createdUser) => {
                res.send({ token: tokenForUser(createdUser) });
              })
            }
          })
      }
    });
};
