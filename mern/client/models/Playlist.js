const mongoose = require('mongoose');
const User = require('./User').schema;
const Song = require('./Song').schema;
const Artist = require('./Artist').schema;

const playlistSchema = new mongoose.Schema({
  user_songs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  biography: {
    type: String,
    default: 'Nothing Here...'
  },
  coverImg: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;