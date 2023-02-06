require("dotenv").config();
const { Router } = require("express");
const spotify = Router();
const axios = require('axios').default;

let spotifyToken = "Bearer ";
let spotifyTracks = null;
let spotifySearch = null;

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

spotify.post('/api/getSearchResults', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  console.log(spotifyToken);
  try{
  const spotify_songs = await axios({
    method: "GET",
    url: "https://api.spotify.com/v1/search?",
    headers: {  "Accept": "application/json", 
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
    params: {
      'q': req.body.param1,
      'type': 'track',
      'market': 'ES',
      'limit': '5',
      'offset': '0'
    }
    
  });
  res.json(spotify_songs.data.tracks.items);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});

module.exports = spotify;