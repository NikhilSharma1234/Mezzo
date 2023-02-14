require("dotenv").config();
const { Router } = require("express");
const router = Router();
const User = require("./models/User.js");
const Token = require("./models/Token");
const {forgotPasswordHandler, resetPasswordHandler} = require("./password_reset");
const JWT = require("jsonwebtoken");
const PlaylistsController = require("./controllers/PlaylistsController.js");
const UsersController = require("./controllers/UsersController.js");

router.post('/user', UsersController.newUser);
router.post('/user/logout', UsersController.logoutUser);
router.post('/user/password', UsersController.forgotPassword);
router.get('/user/password', UsersController.resetPassword);

router.post('/playlist', PlaylistsController.newPlaylist);
router.get('/playlist', PlaylistsController.getPlaylist);
router.get('/playlist/all', PlaylistsController.getAllPlaylists);
router.delete('/playlist', PlaylistsController.deletePlaylist);
router.put('/playlist/add', PlaylistsController.addSong);
router.put('/playlist/remove', PlaylistsController.removeSong);


router.post('/user/login', async (req, res) => {
  User.findOne({username: req.body.username}, async function(err, user) {
      if (err) {
        return res.status(500).send({error: 'Error while trying to find user'});
      }
      if (!user){
        console.log("User doesn't exist");
      } else {
        const matchedPasswords = await user.validPassword(req.body.password, user.password);
        if (matchedPasswords) {
          console.log("Correct Password");
          return res.send({success: true});
        } else {
          console.log("Incorrect Password");
          return res.status(401).send({error: 'Incorrect password'});
        }
      }
    });
});

module.exports = router;
