require("dotenv").config();
const { Router } = require("express");
const spotify = Router();
const axios = require('axios').default;
const file_it = require('fs');

let spotifyToken = "Bearer ";
let spotifyTracks = null;

async function fetchToken () {
  let linking = null;
  const token_object = await axios({
    method: "post",
    url: process.env.API_BASE_LINK,
    data: {"grant_type": "client_credentials"},
    headers: { "Content-Type": "application/x-www-form-urlencoded",
               "Authorization" : process.env.API_AUTHORIZATION },
  });
  return token_object.data.access_token;
}

spotify.get('/discover', async (req, res) => {
  spotifyToken = spotifyToken + await fetchToken();
  res.send('discover');
  res.json();
});

module.exports = spotify;