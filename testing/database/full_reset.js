import mongoose from 'mongoose';

import subscriptionPlansReset from './subscription_plans';

import MetaInformation from '../../src/models/meta_information_model';

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

// reset and populate the MetaInformation
const metaInformationPromise = MetaInformation.collection.drop()
  .catch((error) => {
    // we ignore the error if it's about "dropping a nonexistent collection"
    if (error.message.match('ns not found')) {
      return;
    } else {
      throw error;
    }
  })
  .then(() => {
    const subscriptionPlansPromise = subscriptionPlansReset();

    return Promise.all([
      subscriptionPlansPromise,
    ])
  })
  .then((resolvedPromises) => {
    const standardSubscriptionPlans = resolvedPromises[0].map(ssp => ssp._id);
    return MetaInformation.create({
      // builtInStrategies,
      // builtInModels,
      // builtInScripts,

      standardSubscriptionPlans,
    })
  })

Promise.all([
  metaInformationPromise,
])
.then((resolvedPromises) => {
  mongoose.disconnect();
})
