import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  // social information
  // ====
  tags: [String],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

  // content
  // ====
  title: String,
  content: String,
  strategy: { type: Schema.Types.ObjectId, ref: 'Strategy' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema, 'posts');

export default PostModel;
