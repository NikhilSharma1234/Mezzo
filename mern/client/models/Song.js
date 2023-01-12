//import { Artist } from './Artist.js';

const mongoose = require('mongoose');
const Artist = require('./Artist').schema;

const songSchema = new mongoose.Schema({
	artist   : { Schema.Types.ObjectId, ref: 'Artist.fullName'},
	album    : { type: String },
	title    : { type: String, required: true },
	coverImg : { type: String, required: true },
	length   : { type: Date, required: true},
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;