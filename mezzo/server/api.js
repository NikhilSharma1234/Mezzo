require("dotenv").config();
const { Router } = require("express");
const router = Router();

const PlaylistsController = require("./controllers/PlaylistsController.js");
const UsersController = require("./controllers/UsersController.js");

router.get('/user/:id', UsersController.getUser);
router.post('/user', UsersController.newUser);
router.post('/user/login', UsersController.loginUser);
router.put('/user/password', UsersController.forgotPassword);
router.get('/user/password', UsersController.resetPassword);

router.post('/playlist', PlaylistsController.newPlaylist);
router.get('/playlist', PlaylistsController.getPlaylist);
router.get('/playlist/all', PlaylistsController.getAllPlaylists);
router.delete('/playlist', PlaylistsController.deletePlaylist);
router.put('/playlist/add', PlaylistsController.addSong);
router.put('/playlist/remove', PlaylistsController.removeSong);

module.exports = router;





