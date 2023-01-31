const nodemailer = require("nodemailer");

const sendEmail = async (email, username, info, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_AUTH,

      }
    });
    let mailOptions = {
      from: process.env.EMAIL_HOST,
      to: email,
      subject: 'Forgot Password - Mezzo',
      text: info
    };

    transporter.sendMail(mailOptions, function(error, info){});
  } catch (err) {
    return err;
  }
};

module.exports = sendEmail;
