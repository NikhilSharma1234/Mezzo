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
router.get('/user', UsersController.getUser);
router.post('/user/password', UsersController.forgotPassword);
router.get('/user/password', UsersController.resetPassword);
router.post('/user/editProfileImg', UsersController.newProfilePic)

router.post('/playlist', PlaylistsController.newPlaylist);
router.get('/playlist', PlaylistsController.getPlaylist);
router.get('/playlist/all', PlaylistsController.getAllPlaylists);
router.delete('/playlist', PlaylistsController.deletePlaylist);
router.put('/playlist/add', PlaylistsController.addSong);
router.put('/playlist/remove', PlaylistsController.removeSong);

router.post('/user/login', async (req, res) => {
  User.findOne({username: req.body.username}, async function(err, user) {
    if (!user){
      console.log("User doesn't exist");
    } else {
      const matchedPasswords = await user.validPassword(req.body.password, user.password);
      if (matchedPasswords) {
        return res.send({success: true});
      } else {
        return res.status(401).send({error: 'Incorrect password'});
      }
    }
  });
});


router.post('/user/logout', async (req, res) => {
  console.log("at logout endpoint")
  try{
      req.session.destroy();
      console.log("try")
      return res.send({success: true});
  }
  catch{
      console.log("catch")
      return res.status(401).send({error: 'Unable to destroy user session'});
  }
});

module.exports = router;
