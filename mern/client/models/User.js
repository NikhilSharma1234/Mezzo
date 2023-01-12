const mongoose = require('mongoose');
const Friends = require('./Friends').schema;

const userSchema = new mongoose.Schema({
	username   : { type: String, required: true, unique: true },
	password   : { type: String, required: true },
	email      : { type: String, required: true, unique: true },
	securityQ1 : { type: String, required: true },
	securityQ2 : { type: String, required: true},
	birthday   : { type: Date },
	age 	   : { type: Number, min: 12, required: true},
	friends    : { type: [Schema.Types.ObjectId], ref: 'Friends', default: []},
});


// Insert Password Hash Here

// Insert Password Validation Here

// Password Reset Here --> Insert Security Q(s) Validation Here

const User = mongoose.model('User', userSchema);
module.exports = User;