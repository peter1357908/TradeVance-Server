import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  auth: {
    username: { type: String, unique: true },
    password: String,
  },

  profile: {
    email: { type: String, unique: true, lowercase: true },
    profilePictureUrl: { type:String, default: '' },
    description: { type: String, default: 'A TradeVance user.' },
    website: { type: String, default: '' },
    company: { type: String, default: '' },

    emailIsVerified: Boolean, // debatable placement
  },

  social: {
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ownPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    starredPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    ownComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

    // must be cautious; remember to update likeCount! It is NOT
    // calculated from querying all related data, but rather,
    // maintained separately!
    likeCount: {
      post: { type: Number, default: 0 },
      comment: { type: Number, default: 0 },
      strategy: { type: Number, default: 0 },
      model: { type: Number, default: 0 },
      script: { type: Number, default: 0 },
    },
  },

  messages: {
    inbox: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    sent: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },

  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],

  alerts: [
    {
      alertType: String,
      parameters: Map,
    },
  ],

  subscription: {
    plan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    fromDate: Date,
    toDate: Date,
    billingFrequency: Number,
    autoRenew: Boolean,
    // autoRenew: { type: Boolean, default: false },

  },

  simulatedAccounts: [{ type: Schema.Types.ObjectId, ref: 'SimulatedAccount' }],

  ideas: {
    own: {
      strategies: [{ type: Schema.Types.ObjectId, ref: 'Strategy' }],
      models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
      scripts: [{ type: Schema.Types.ObjectId, ref: 'Script' }],
    },

    starred: {
      strategies: [{ type: Schema.Types.ObjectId, ref: 'Strategy' }],
      models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
      scripts: [{ type: Schema.Types.ObjectId, ref: 'Script' }],
    },
  },

  billing: {
    cardNumber: String,
    expirationMonth: Number, // 1 - 12
    expirationYear: Number,
    cardHolderName: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
  },

  // UX settings
  // ====
  privacy: {
    showFollowers: { type: Boolean, default: false },
    showFollowing: { type: Boolean, default: false },
  },

  notificationPreference: {
    alert: String,
    message: String,
    comment: String,
    follower: String,
    system: String, // including things like maintainence notice and billing reminder
  },

}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    // remove password from the returned JSON; does not conflict with comparePassword()
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.auth.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

UserSchema.pre('save', function saltAndHash(next) {
  // `this` is a reference to our User model
  // do not bind the function as it runs in other context
  // if (!this.isModified('auth.password')) { return next(); }
  if (!this.isModified('auth.password')) { return next(); }

  const saltRounds = 10;

  return bcrypt.hash(this.auth.password, saltRounds)
    .then((saltedHash) => {
      this.auth.password = saltedHash;
      // we do not have to call save() pre-save...
      return next();
    })
    .catch((error) => {
      return next(error);
    });
});

// do not bind the function as it runs in other context
// expected callback signature: callback(err, isMatch)
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.auth.password, (err, isMatch) => {
    if (err) {
      // JS shorthand? Why not `callback(err, null)`?
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;
