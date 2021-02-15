import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  auth:{
    email: { type: String, unique: true, lowercase: true },
    password: String,
  },

  profile: {
    username: { type: String, unique: true },
    profilePictureUrl: String,
    description: String,
    website: String,
    company: String,

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
      post: Number,
      comment: Number,
      strategy: Number,
      model: Number,
      script: Number,
    }
  },

  messages: {
    inbox: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    sent: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
  },

  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],

  alerts: [
    {
      alertType: String,
      parameters: Map,
    }
  ],

  subscription: {
    plan: [{ type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],
    fromDate: Date,
    toDate: Date,
    billingFrequency: Number,
    autoRenew: Boolean,

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
    expirationMonth: Number,  // 1 - 12
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
    showFollowers: Boolean,
    showFollowing: Boolean,
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
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;