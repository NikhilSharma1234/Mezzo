const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const tokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

tokenSchema.methods.resetHash = async (token) => {
  token = token.toString();
  const hash = await bcrypt.hash(token, 10);
  return hash;
};

tokenSchema.methods.validToken = async (token, hash) => {
  return await bcrypt.compare(token, hash);
};

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;