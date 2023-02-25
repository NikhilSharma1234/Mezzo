require("dotenv").config();
const { Router } = require("express");
const spotify = Router();
const axios = require("axios").default;

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

spotify.post("/getRelatedArtists", async (req, res) => {
  spotifyToken = "Bearer " + (await fetchToken());
  try {
    const spotify_relatedArtists = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${req.body.artistID}/related-artists`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: spotifyToken,
      },
      params: {
        market: "ES",
      },
    });
    res.json(spotify_relatedArtists.data.artists);
  } catch (error) {
    console.error(error);
  }
  spotifyToken = "";
});

spotify.post("/getArtistAlbums", async (req, res) => {
  spotifyToken = "Bearer " + (await fetchToken());
  try {
    const spotify_songs = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${req.body.artistID}/albums`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: spotifyToken,
      },
      params: {
        include_groups: req.body.artistGroups,
        market: 'ES',
        limit: '10',
        offset: '0'
      },
    });
    res.json(spotify_songs.data);
  } catch (error) {
    console.error(error);
  }
  spotifyToken = "";
});

spotify.post('/getArtist', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  try{
  const spotify_artist = await axios({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${req.body.artistID}`,
    headers: {  "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
  });
  res.json(spotify_artist.data);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});

spotify.post('/getAlbum', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  try{
  const spotify_album = await axios({
    method: "GET",
    url:`https://api.spotify.com/v1/albums/${req.body.albumID}`,
    headers: {  "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
  });
  res.json(spotify_album.data);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});


spotify.post('/getNewReleases', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  try{
  const spotify_releases = await axios({
    method: "GET",
    url:`https://api.spotify.com/v1/browse/new-releases`,
    headers: {  "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : spotifyToken},
    params: {
      'country': 'SE',
      'limit': req.body.limit,
      'offset': '0'
    }
  });
  res.json(spotify_releases.data);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});

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
  }
  spotifyToken = "";
});

spotify.post('/getTop100', async (req, res) => {
  spotifyToken = "Bearer " + await fetchToken();
  try{
    const spotify_tracks = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/playlists/6UeSakyzhiEt4NB3UAd6NQ?market=US`,
      headers: {  "Accept": "application/json", 
                  "Content-Type": "application/json",
                  "Authorization" : spotifyToken},
    });
    res.json(spotify_tracks.data.tracks.items);
  }catch(error){
    console.error(error);
  }
  spotifyToken = "";
});

module.exports = spotify;
