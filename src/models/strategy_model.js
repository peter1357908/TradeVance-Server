import mongoose, { Schema } from 'mongoose';

const StrategySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  // social information
  // ====
  name: { type: String, unique: true },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description: String,

  // content
  // ====
  models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
  
  // Yes... as of now, a "strategy" is just a list of "models"...
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const StrategyModel = mongoose.model('Strategy', StrategySchema, 'strategies');


export default StrategyModel;
