const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    ref: 'User'
  }],
});

userSchema.methods.generateHash = async (password) => {
  password = password.toString();
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

userSchema.methods.validPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Password Reset Here --> Insert Security Q(s) Validation Here

const User = mongoose.model('User', userSchema);
module.exports = User;