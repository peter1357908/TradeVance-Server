import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  // social information
  // ====
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // content
  // ====
  content: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const CommentModel = mongoose.model('Comment', CommentSchema, 'comments');

export default CommentModel;
