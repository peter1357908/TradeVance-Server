import SubscriptionPlan from '../../src/models/subscription_plan_model';
import { SubscriptionPlanNames } from '../../global-variables';

// returns a promise that will resolve to an array of
// SubscriptionPlan documents.
function subscriptionPlansReset() {
  return SubscriptionPlan.collection.drop()
    .catch((error) => {
      // we ignore the error if it's about "dropping a nonexistent collection"
      if (error.message.match('ns not found')) {
        return;
      } else {
        throw error;
      }
    })
    .then(() => {
      return SubscriptionPlan.create([
        {
          name: SubscriptionPlanNames.FREE_PLAN,
          billingFrequency: 0,
          // more attributes to be defined
        },
        {
          name: SubscriptionPlanNames.FANCY_PLAN,
          billingFrequency: 100,
          // more attributes to be defined
        }
      ]);
    })
}

export default subscriptionPlansReset;