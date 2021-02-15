import mongoose, { Schema } from 'mongoose';

const SubscriptionPlanSchema = new Schema({
  name: String,
  billingFrequency: Number, // in terms of days

  maxStorage: Number, // in MegaBytes; anything that takes up storage counts...?

  // maxStrategies: Number,
  // maxModels: Number,
  // maxScripts: Number,
  // and much more. To be designed.
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create model class
const SubscriptionPlanModel = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema, 'subscriptionplans');

export default SubscriptionPlanModel;
