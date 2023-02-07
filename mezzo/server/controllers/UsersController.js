require("dotenv").config();
const User = require("../models/User");
const Token = require("../models/Token");
const {forgotPasswordHandler, resetPasswordHandler} = require("../password_reset");
const JWT = require("jsonwebtoken");

// User Constraints
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const getUser = async (req, res) => {
    try {
      const queriedUser = await User.findById(req.params.id);
      const objectUser = queriedUser.toObject();
      delete objectUser.password;
      res.json(objectUser);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    } // dummy function for now
};

const newUser = async (req, res) => {
    try {
      const newUser = await User({ ...req.body });
      if (!emailReg.test(newUser.email)){
        res.send("Invalid email");
      } else if (!passwordReg.test(newUser.password)){
        res.send("Minimum eight characters, at least one letter, one number and one special character");
      } else {
        newUser.password = await newUser.generateHash(req.body.password);
        const token = JWT.sign({id: newUser._id}, process.env.JWT_SECRET);
        const token_data = {
          userID: newUser._id,
          token: token,
        };
        const newToken = await Token(token_data);
        await newToken.save();
        await newUser.save();
        res.json({ id: newUser._id });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
};

const loginUser = async (req, res) => {
    User.findOne({username: req.body.username}, async function(err, user) {
      if (!user){
        console.log("User doesn't exist");
      } else {
        const matchedPasswords = await user.validPassword(req.body.password, user.password);
        if (matchedPasswords) {
          console.log("Correct Password");
          res.redirect("/_/home");
        } else {
          console.log("Incorrect Password");
          res.redirect('/signup');
        }
      }
    });
};

const forgotPassword = (req, res) => {
    forgotPasswordHandler(req.body.email).catch(console.error);
    res.send("Sent");
};

const resetPassword = (req, res) => {
    Token.findOne({userID: req.query.id}, async function(err, newToken) {
      try {
        var format = req.query.format,
        type = req.query.type;
        if (resetPasswordHandler(req.query.id, req.query.token, 'whateverplaintextpasswordhere').catch(console.error)){
          res.send("Success");
        }
      } catch (err) {
        console.error(err);
        res.sendStatus(400);
      }
    });
};

module.exports = {
    getUser,
    newUser,
    loginUser,
    forgotPassword,
    resetPassword
};