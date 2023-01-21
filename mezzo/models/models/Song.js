//import { Artist } from './Artist.js';

const mongoose = require('mongoose');
const Artist = require('./Artist').schema;

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  album: {
    type: String,
    required: true
  },
  released: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;