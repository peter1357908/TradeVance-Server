import mongoose, { Schema } from 'mongoose';

const MetaInformationSchema = new Schema({
  builtInStrategies: [{ type: Schema.Types.ObjectId, ref: 'Strategy' }],
  builtInModels: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
  builtInScripts: [{ type: Schema.Types.ObjectId, ref: 'Script' }],
  
  standardSubscriptionPlans: [{ type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const MetaInformationModel = mongoose.model('MetaInformation', MetaInformationSchema, 'metainformation');


export default MetaInformationModel;
