require("dotenv").config();
const { Router } = require("express");
const apiRouter = Router();
const User = require("./models/User");
const Token = require("./models/Token");
const {forgotPassword, resetPassword} = require("./password_reset");
const JWT = require("jsonwebtoken");
const axios = require('axios').default;

// User Constraints
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

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

apiRouter.post('/register/user', async (req, res) => {
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

apiRouter.post('/login/user', function(req, res) {
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