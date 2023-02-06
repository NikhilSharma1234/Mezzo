require("dotenv").config();
const { Router } = require("express");
const router = Router();

const PlaylistsController = require("./controllers/PlaylistsController.js");
const UsersController = require("./controllers/UsersController.js");

router.get('/user/:id', UsersController.getUser);
router.post('/user', UsersController.newUser);
router.put('/user/login', UsersController.loginUser);
router.put('/user/password', UsersController.forgotPassword);
router.get('/user/password', UsersController.resetPassword);

router.post('/playlist', PlaylistsController.newPlaylist);
router.get('/playlist', PlaylistsController.getPlaylist);
router.put('/playlist/add', PlaylistsController.addSong);
router.put('/playlist/remove', PlaylistsController.removeSong);

module.exports = router;





