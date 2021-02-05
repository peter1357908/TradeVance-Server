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
  },
  
  social: {
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ownPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    starredPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

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