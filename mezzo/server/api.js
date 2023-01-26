require("dotenv").config();
const { Router } = require("express");
const apiRouter = Router();
const User = require("./models/User");
const axios = require('axios').default;
let apiToken = null;

function apiRefresh () {
	axios({
	  method: "post",
	  url: process.env.API_BASE_LINK,
	  data: {"grant_type": "client_credentials"},
	  headers: { "Content-Type": "application/x-www-form-urlencoded",
	  					 "Authorization" : process.env.API_AUTHORIZATION },
	})
  .then(function (response) {
  	apiToken = response.data.access_token;
  })
  .catch(function (response) {
    console.log(response);
  });
}

apiRouter.post('/refresh_token', async (req, res) => {
	try {
		apiRefresh();
	} catch (err) {
		console.log(err);
	}
});


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

apiRouter.post("/user/", async (req, res) => {
  try {
    const newUser = await User({ ...req.body });
    await newUser.save();
    res.json({ id: newUser._id });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});




module.exports = apiRouter;