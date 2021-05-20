import mongoose from 'mongoose';

import User from '../../src/models/user_model';

// DB Setup
// the following `config` are all for fixing the DeprecationWarning
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/TradeVance';
mongoose.connect(mongoURI, config);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

const user1 = User.create({
  auth: {
    username: 'b',
    password: 'b',
  },
  profile: {
    email: 'b@b.com',
  },
})

Promise.all([
  user1,
])
  .then(() => {
    mongoose.disconnect();
  })
