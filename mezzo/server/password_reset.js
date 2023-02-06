const Token = require("./models/Token");
const User = require("./models/User");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const forgotPasswordHandler = async (email) => {
  const user = await User.findOne({email});
  if (!user) {
    console.log("User does not exist");
  } else {
    let token = await Token.findOne({ userID: user._id });
    if (token) { 
      await token.deleteOne()
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
    await new Token({
      userID: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
    const link = `${process.env.CLIENT_URL}/api/reset_password?token=${resetToken}&id=${user._id}`;
    const text = `Dear ${user.username}, \n Reset your password here: ${link}`;
    sendEmail(user.email, user.username, text, link);
  };
};

const resetPasswordHandler = async (userID, token, password) => {
  let passwordResetToken = await Token.findOne({ userID });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, 10);
  await User.updateOne(
    { _id: userID },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userID });
  const text = `Dear ${user.username}, \n Your password is successfully reset.`
  sendEmail(user.email, user.username, text, null);
  await passwordResetToken.deleteOne();
  return true;
};

module.exports = {
   forgotPasswordHandler,
   resetPasswordHandler,
}