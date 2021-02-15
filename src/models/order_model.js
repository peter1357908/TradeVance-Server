import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  symbol: String,
  type: String,

  params: Map,

  amountOrdered: Number,
  amountFilled: Number,

  limitPrice: Number, // per unit

  status: { type: String, enum: ['pending', 'canceled', 'filled'] },
  
  // the following refers to the simulation date
  dateInitiated: Date,
  dateEnded: Date,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const OrderModel = mongoose.model('Order', OrderSchema, 'orders');


export default OrderModel;
