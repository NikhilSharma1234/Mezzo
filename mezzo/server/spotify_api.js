require("dotenv").config();
const { Router } = require("express");
const spotify = Router();
<<<<<<< HEAD
const axios = require('axios').default;

=======
const axios = require("axios").default;
>>>>>>> 61ea52c (endpoints)

let spotifyToken = "Bearer ";
let spotifyTracks = null;
let spotifySearch = null;

async function fetchToken() {
  let linking = null;
  const token_object = await axios({
    method: "post",
    url: process.env.API_BASE_LINK,
    data: { grant_type: "client_credentials" },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: process.env.API_AUTHORIZATION,
    },
  });
  return token_object.data.access_token;
}

spotify.post("/getSearchResults", async (req, res) => {
  spotifyToken = "Bearer " + (await fetchToken());
  try {
    const spotify_songs = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/search?",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: spotifyToken,
      },
      params: {
        q: req.body.q,
        type: req.body.type,
        market: "ES",
        limit: "10",
        offset: "0",
      },
    });
    res.json(spotify_songs.data);
  } catch (error) {
    console.error(error);
  }
  spotifyToken = "";
});

spotify.post("/getArtistTopTracks", async (req, res) => {
  spotifyToken = "Bearer " + (await fetchToken());
  try {
    const spotify_songs = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${req.body.artistID}/top-tracks`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: spotifyToken,
      },
      params: {
        market: "ES",
      },
    });
    res.json(spotify_songs.data.tracks);
  } catch (error) {
    console.error(error);
  }
  spotifyToken = "";
});

// spotify.post('/getArtist', async (req, res) => {
//   spotifyToken = "Bearer " + await fetchToken();
//   try{
//   const spotify_artist = await axios({
//     method: "GET",
//     url: `https://api.spotify.com/v1/artists/${req.body.param1}`,
//     headers: {  "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "Authorization" : spotifyToken},
//   });
//   res.json(spotify_artist);
//   }catch(error){
//     console.error(error);
//   }
//   spotifyToken = "";
// });

// spotify.post('/getTrack', async (req, res) => {
//   spotifyToken = "Bearer " + await fetchToken();
//   try{
//   const spotify_track = await axios({
//     method: "GET",
//     url: `https://api.spotify.com/v1/tracks/${req.body.param1}`,
//     headers: {  "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "Authorization" : spotifyToken},
//     params: {
//       'market': 'ES',
//     }

//   });
//   res.json(spotify_track);
//   }catch(error){
//     console.error(error);
//   }
//   spotifyToken = "";
// });

spotify.post("/getSeveralTracks", async (req, res) => {
  spotifyToken = "Bearer " + (await fetchToken());
  try {
    const spotify_tracks = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/tracks?market=ES&ids=${req.body.IDs}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: spotifyToken,
      },
    });
    res.json(spotify_tracks.data.tracks);
  } catch (error) {
    console.error(error);
  }
  spotifyToken = "";
});

<<<<<<< HEAD

spotify.post('/getSeveralTracks', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  try{
  const spotify_tracks = await axios({
    method: "GET",
    url: `https://api.spotify.com/v1/tracks?market=ES&ids=${req.body.IDs}`,
    headers: {  "Accept": "application/json", 
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
  });
  res.json(spotify_tracks.data.tracks);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});

module.exports = spotify;
=======
module.exports = spotify;
>>>>>>> 61ea52c (endpoints)
