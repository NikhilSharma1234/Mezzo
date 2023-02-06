require("dotenv").config();
require('mongoose').Types.ObjectId;
const { Router } = require("express");
const apiRouter = Router();
const User = require("./models/User");
const Playlist = require("./models/Playlist")
const Token = require("./models/Token");
const {forgotPassword, resetPassword} = require("./password_reset");
const JWT = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const axios = require('axios').default;

// User Constraints
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

apiRouter.get("/user/:id", async (req, res) => {
  try {
    const queriedUser = await User.findById(req.params.id);
    const objectUser = queriedUser.toObject();
    delete objectUser.password;
    res.json(objectUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

apiRouter.post('/user/register', async (req, res) => {
  try {
    const newUser = await User({ ...req.body });
    if (!emailReg.test(newUser.email)){
      res.send("Invalid email");
      res.redirect('/');
    } else if (!passwordReg.test(newUser.password)){
      res.send("Minimum eight characters, at least one letter, one number and one special character");
      res.redirect('/');
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
    res.sendStatus(400);
  }
});

apiRouter.post('/user/login', function(req, res) {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      console.log("User doesn't exist");
    } else {
      const matchedPasswords = await user.validPassword(req.body.password, user.password);
      if (matchedPasswords) {
        console.log("Correct Password");
        //redirect here...
        res.send("yup");
      } else {
        console.log("Incorrect Password");
        //redirect here...
        res.send("nope");
      }
    }
  });
});

apiRouter.post('/playlist/create', function(req, res) {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      res.send("User doesn't exist");
    } else {
        try {
          const newPlaylist = await Playlist({ ...req.body });
          newPlaylist.user = user._id;
          await newPlaylist.save();
          res.json({ id: newPlaylist._id });
        } catch (err) {
          console.error(err);
          res.sendStatus(400);
        }
      }
  });
});

apiRouter.put('/playlist/add', function(req, res) {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      console.log("User doesn't exist");
    } else if(!req.body.song_id) {
        res.send("No song id");
    }
      else {
        try {
          Playlist.findById(req.body.id, async function(err, playlist) {
            if (!playlist) {
              res.send("Playlist not found");
            }
            else {
              if (playlist.songs.includes(req.body.song_id)) res.status(404).send("Song already exists in playlist");
              playlist.songs.push(req.body.song_id);
              playlist.updatedAt = new Date();
              playlist.save();
              res.json({song_ids: playlist.songs});
            }
          });
        } catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      }
  });
});

apiRouter.put('/playlist/remove', function(req, res) {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      res.send("username does not exist");
    } else if(!req.body.song_id) {
        res.send("No song id");
    }
      else {
        try {
          Playlist.findById(req.body.id, async function(err, playlist) {
            if (!playlist) {
              res.send("Playlist not found");
            }
            else {
              const songs = playlist.songs;
              playlist.songs = songs.filter(song_id => song_id !== req.body.song_id);
              playlist.updatedAt = new Date();
              playlist.save();
              res.json({song_ids: playlist.songs});
            }
          });
        } catch (err) {
          res.send(err);
          res.sendStatus(400);
        }
      }
  });
});

apiRouter.get('/playlist', function(req, res) {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      res.send("username does not exist");
    }
    else {
      try {
        Playlist.findById(req.body.id, async function(err, playlist) {
          if (!playlist) {
            res.send("Playlist not found");
          }
          else {
            res.json({playlist: playlist});
          }
        });
      } catch (err) {
        res.send(err);
        res.sendStatus(400);
      }
    }
  });
});

apiRouter.post('/reset_password', function(req, res) {
  forgotPassword(req.body.email).catch(console.error);
  res.send("Sent");
});

apiRouter.get('/reset_password', function(req, res) {
  Token.findOne({userID: req.query.id}, async function(err, newToken) {
    try {
      var format = req.query.format,
      type = req.query.type;
      if (resetPassword(req.query.id, req.query.token, 'whateverplaintextpasswordhere').catch(console.error)){
        res.send("Success");
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
});

module.exports = apiRouter;