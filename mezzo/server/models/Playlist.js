const mongoose = require('mongoose');
const User = require('./User').schema;

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  songs: {
    type: [Number],
    default: []
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
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;