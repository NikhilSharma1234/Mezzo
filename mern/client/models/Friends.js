const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
	friends : [{ type : Schema.Types.ObjectId, ref: 'User', required: false}],
	hasFriends : { type : Boolean },
});

const Friends = mongoose.model('Friends', friendSchema);

module.exports = Friends;