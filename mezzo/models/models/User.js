const mongoose = require('mongoose');
const Friends = require('./Friends').schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  securityQ1: {
    type: String,
    required: true,
  },
  securityQ2: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friends'
  }],
});


// Insert Password Hash Here

// Insert Password Validation Here

// Password Reset Here --> Insert Security Q(s) Validation Here

const User = mongoose.model('User', userSchema);
module.exports = User;