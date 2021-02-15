import mongoose, { Schema } from 'mongoose';

const PositionSchema = new Schema({
  symbol: String,
  type: String,

  params: Map,

  amountHeld: Number,
  averageCost: Number, // per unit 

  // currently, a Position document is deleted upon a full exit (fully closed)
  // hence, fields like "status" and "dateEnded" are not yet meaningful.
  // status: { type: String, enum: ['open', 'closed'] },

  // the following refers to the simulation date
  dateInitiated: Date,
  // dateEnded: Date,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const PositionModel = mongoose.model('Position', PositionSchema, 'positions');


export default PositionModel;
