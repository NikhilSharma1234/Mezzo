const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
	name      : { type : String, required: true },
	user      : { type : Schema.Types.ObjectId, ref : 'User', required: true },
	biography : { type : String },
	songs     : { type : Array, default: [] },
	coverImg  : { type : Buffer },
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;