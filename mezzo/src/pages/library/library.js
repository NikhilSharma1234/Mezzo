import './library.scoped.css'
import React, { useState, useEffect } from "react";
import PlaylistCards from "../../components/cards/playlist-card.js";
import CreatePlaylist from "../../components/cards/playlist-card.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, []);

  function reloadPlaylists() {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
    };
    fetchPlaylists();
  }

  return (
    <section className="main_closed main">
      <h1>Your Playlists</h1>
      <button id="create-playlist" onClick={CreatePlaylist}>Create a playlist</button>

      <PlaylistCards playlists={playlists} reloadPlaylists={reloadPlaylists}/>
    </section>
  );
};

export default Library;