import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: Schema.Types.ObjectId, ref: 'User' },

  inReplyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
  
  title: String,
  content: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const MessageModel = mongoose.model('Message', MessageSchema, 'messages');


export default MessageModel;
