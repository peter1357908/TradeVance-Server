import mongoose, { Schema } from 'mongoose';

const ModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  // social information
  // ====
  name: { type: String, unique: true },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description: String,

  // content
  // ====
  script: { type: Schema.Types.ObjectId, ref: 'Script' },

  // the list of securities over which the script runs, identified by ticker names
  watchlist: [{ type: String }],

  // key and value depends on the target script
  // (the Script contains instruction for the field names and the type of each field)
  input: Map,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const ModelModel = mongoose.model('Model', ModelSchema, 'models');


export default ModelModel;
