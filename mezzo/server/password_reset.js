const Token = require("./models/Token");
const User = require("./models/User");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const forgotPasswordHandler = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    return false;
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
    const link = `${process.env.CLIENT_URL}/api/user/password?token=${resetToken}&id=${user._id}&pw=${password}`;
    const text = `Dear ${user.username}, \n Click here to activate the password previously created: ${link}`;
    sendEmail(user.email, user.username, text, link);
    return true;
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
  console.log("UserID", userID, "Token: ", token, "PW:", password);
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
  await User.updateOne(
    { _id: userID },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userID });
  const text = `Dear ${user.username}, \n Your new password is successfully activated.`
  sendEmail(user.email, user.username, text, null);
  await passwordResetToken.deleteOne();
  return true;
};

module.exports = {
   forgotPasswordHandler,
   resetPasswordHandler,
}