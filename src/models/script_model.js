import mongoose, { Schema } from 'mongoose';

const ScriptSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  // social information
  // ====
  name: { type: String, unique: true },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description: String,

  // content
  // ====

  fileUrl: String,

  // key: name of the field, value: type of the field
  // They are for constructing the GUI for asking for input and displaying output
  inputTypes: { type: Map, of: String },
  outputTypes: { type: Map, of: String }
});

// create model class
const ScriptModel = mongoose.model('Script', ScriptSchema, 'scripts');


export default ScriptModel;
