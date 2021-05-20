import mongoose, { Schema } from 'mongoose';

const SubscriptionPlanSchema = new Schema({
  name: String,
  billingFrequency: Number, // in terms of days; `0` means no billing is required

  // maxStorage: Number, // in MegaBytes. However, what counts as "taking up storage"?

  // maxWatchLists: Number,
  // maxSimulatedAccounts: Number,
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
