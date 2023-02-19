require('mongoose').Types.ObjectId;
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

const newPlaylist = (req, res) => {
    User.findOne({username: req.body.username}, async function(err, user) {
      if (!user){
        res.send("User doesn't exist");
      } else {
          try {
            const newPlaylist = await Playlist({ ...req.body });
            newPlaylist.user = user._id;
            await newPlaylist.save(async function(err, playlist) {
              user.playLists.push(playlist.id);
              await user.save();
           });
            res.json({ id: newPlaylist._id });
           } catch (err) {
            console.error(err);
            res.sendStatus(400);
          }
        }
    });
};

const deletePlaylist = (req, res) => {
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
            playlist.remove();
            user.playLists = user.playLists.filter(playlist_id => playlist_id !== playlist._id);
            user.save();
            res.send(`Playlist ${playlist.name} removed!`);
          }
        });
      } catch (err) {
        res.send(err);
        res.sendStatus(400);
      }
    }
  });
}

const getAllPlaylists = (req, res) => {
  User.findOne({username: req.query.username}, async function(err, user) {
    if (!user){
      res.send("username does not exist");
    }
    else {
      try {
        Playlist.find({
          '_id': { $in: user.playLists}
      }, function(err, playlists){
        if (!playlists) {
          res.send("PlayLists not found");
        }
        else {
          res.json({playlists: playlists});
        }
      });
      } catch (err) {
        res.send(err);
        res.sendStatus(400);
      }
    }
  });
}

const getPlaylist = (req, res) => {
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
};
  
const addSong = (req, res) => {
    User.findOne({username: req.body.username}, async function(err, user) {
      if (!user){
        console.log("User doesn't exist");
      } else if(!req.body.song_id) {
          res.send("No song id");
      }
        else {
          try {
            Playlist.findOne({name: req.body.playlist_name, user: user._id}, async function(err, playlist) {
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
};

const removeSong = (req, res) => {
    User.findOne({username: req.body.username}, async function(err, user) {
      if (!user){
        res.send("username does not exist");
      } else if(!req.body.song_id) {
          res.send("No song id");
      }
        else {
          try {
            Playlist.findOne({name: req.body.playlist_name, user: user._id}, async function(err, playlist) {
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
};
  
module.exports = {
    newPlaylist,
    getAllPlaylists,
    getPlaylist,
    addSong,
    removeSong,
    deletePlaylist
};