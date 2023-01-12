const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
	fullName : { type: String, required: true },
	biography : { type: String, required: true },
	coverImg  : { type: String },
	birthday  : { type: Date, required: true},
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;