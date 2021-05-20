import mongoose, { Schema } from 'mongoose';

// watchlist itself is not very permanent, so itself is not to be shared or liked
// nor is author information kept in itself
const WatchlistSchema = new Schema({
  name: String,
  symbols: [String],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const WatchlistModel = mongoose.model('Watchlist', WatchlistSchema, 'watchlists');

export default WatchlistModel;
