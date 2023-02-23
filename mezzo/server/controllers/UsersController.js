require("dotenv").config();
const User = require("../models/User");
const Token = require("../models/Token");
const Playlist = require("../models/Playlist");
const {forgotPasswordHandler, resetPasswordHandler} = require("../password_reset");
const JWT = require("jsonwebtoken");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// User Constraints
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const getUser = async (req, res) => {
    User.findOne({username: req.query.username}, async function(err, user) {
      if (user) {
        const userObject = {
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          playlists: user.playlists,
          friends: user.friends
        }
        res.send(userObject)
      }
      else {
        res.send("No user found")
      }
    })
};

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
        const playlist_data = {
          name: 'Liked Songs',
          user: newUser._id,
          biography: 'Your Liked Songs!'
        }
        const newPlaylist = await Playlist(playlist_data);
        newUser.playLists.push(newPlaylist._id);
        await newToken.save();
        await newUser.save();
        await newPlaylist.save();
        req.session.user = newUser;
        res.redirect('/_/discover');
      }
    } catch (err) {
      console.error(err);
    }
};

const forgotPassword = async (req, res) => {
    if (!passwordReg.test(req.body.password)){
      res.send("Minimum eight characters, at least one letter, one number and one special character");
    }

    if (await forgotPasswordHandler(req.body.email, req.body.password)){
      res.send("Sent Email");
    } else {
      res.send("Invalid Email");
    }
};

const resetPassword = async (req, res) => {
    Token.findOne({userID: req.query.id}, async function(err, newToken) {
      try {
        var format = req.query.format,
        type = req.query.type;
        if (await resetPasswordHandler(req.query.id, req.query.token, req.query.pw).catch(console.error)){
          res.sendStatus(200);
        }
      } catch (err) {
        console.error(err);
        res.sendStatus(400);
      }
    });
};

module.exports = {
    newUser,
    getUser,
    forgotPassword,
    resetPassword
};