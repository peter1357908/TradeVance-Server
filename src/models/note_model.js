import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema({
  title: String,
  content: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const NoteModel = mongoose.model('Note', NoteSchema, 'notes');

export default NoteModel;
