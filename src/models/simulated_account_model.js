import mongoose, { Schema } from 'mongoose';

const SimulatedAccountSchema = new Schema({
  accountBalance: Number, // in dollars

  openPositions: [{ type: Schema.Types.ObjectId, ref: 'Position' }],
  pendingOrders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  // updated when the user pauses the simulation
  currentSimulationDate: Date,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create model class
const SimulatedAccountModel = mongoose.model('SimulatedAccount', SimulatedAccountSchema, 'simulatedaccounts');


export default SimulatedAccountModel;
