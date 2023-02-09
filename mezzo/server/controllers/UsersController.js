require("dotenv").config();
const User = require("../models/User");
const Token = require("../models/Token");
const {forgotPasswordHandler, resetPasswordHandler} = require("../password_reset");
const JWT = require("jsonwebtoken");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// User Constraints
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const newUser = async (req, res) => {
    try {
      User.findOne({username: req.body.username}, async function(err, user) {
        if(user){
          res.send("Username already taken");
        }
      });
      User.findOne({email: req.body.email}, async function(err, user) {
        if(user){
          res.send("Email already taken");
        }
      });
       
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
        req.session.user = newUser;
        res.redirect('/_/discover');
      }
    } catch (err) {
      console.error(err);
    }
};

const loginUser = async (req, res) => {
    User.findOne({username: req.body.username}, async function(err, user) {
      if (!user){
        res.send("User doesn't exist");
      } else {
        const matchedPasswords = await user.validPassword(req.body.password, user.password);
        if (matchedPasswords) {
          req.session.user = user;
          res.redirect("/_/discover");
        } else {
          res.redirect('localhost:4000/signup');
          res.sendStatus(200);
        }
      }
    });
};

const logoutUser = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    res.redirect('localhost:4000/login');
};

const forgotPassword = (req, res) => {
    forgotPasswordHandler(req.body.email).catch(console.error);
    res.send("Sent Email");
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
    newUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword
};