import mongoose, { Schema } from 'mongoose';

// Alert itself is not very permanent, so itself is not to be shared or liked
// nor is author information kept in itself
const AlertSchema = new Schema({
  alertType: String,
  parameters: Map,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const AlertModel = mongoose.model('Alert', AlertSchema, 'alerts');

export default AlertModel;
