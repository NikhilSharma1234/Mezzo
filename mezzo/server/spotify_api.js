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

spotify.post('/refresh_token', async (req, res) => {
  try {
    spotifyToken = spotifyToken + await fetchToken();
    spotifyToken = "Bearer " + spotifyToken;
    console.log(spotifyToken);
    res.send("Token Granted");
  } catch (err) {
    console.log(err);
  }
});

spotify.get('/home', async (req, res) => {
  spotifyToken = spotifyToken + await fetchToken();
  const spotify_songs = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_artists=246dkjvS1zLTtiykXe5h60&seed_genres=hip-hop",
    headers: {  "Accept": "application/json", 
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
  });
  spotifyTracks = spotify_songs.data.tracks;
  file_it.writeFile('./../src/data/tracks.json', JSON.stringify(spotifyTracks, null, 4), (error) => {
      if (error) {
          throw error;
      }
  });
  res.json();
});

module.exports = spotify;