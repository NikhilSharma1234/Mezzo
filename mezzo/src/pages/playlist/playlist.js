import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { MusicRow } from "../../components/musicTable/musicRow.js";
import { fetchSeveralTracks } from "../../utils/fetchSeveralTracks.js";
import { fetchPlaylist } from "../../utils/fetchPlaylist.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";



const Playlist=()=> {
  const { playlistID } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [allPlaylists, setAllPlaylists] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchOnePlaylist = async () => {
      const playlist = await fetchPlaylist(playlistID);
      setPlaylist(playlist.playlist);
    };
    fetchOnePlaylist();
  }, []);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      const songs = await fetchSeveralTracks(playlist.songs);
      setSongs(songs);
    };
    if(playlist) fetchPlaylistSongs();
  }, [playlist]);
    
  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setAllPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, []);

  function reloadPlaylists() {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setAllPlaylists(allPlaylists.playlists)
    };
    fetchPlaylists();
  }

  function likeSong(playlistName, id) {
    const fetchPlaylistsDislike = async () => {
      await dislikeSongPut(playlistName, id);
      const allPlaylists = await fetchAllPlaylists();
      setAllPlaylists(allPlaylists.playlists)
    };
    const fetchPlaylists = async () => {
      await likeSongPost(playlistName, id);
      const allPlaylists = await fetchAllPlaylists();
      setAllPlaylists(allPlaylists.playlists);
    };

    const playlist = allPlaylists.find(({name}) => name === playlistName);
    if (playlist.songs.includes(id)) {
      fetchPlaylistsDislike();
    }
    else {
      fetchPlaylists();
    }
  }

  return (
    <>
    {/* {!fromLibrary && (
      <Navigate
        to={{
          pathname: "/_/library",
        }}
        replace={true}
      />
    )} */}



<section className="main_closed main" id="charts-main">
    <h1>{playlist && playlist.name}</h1>
      {/* <h1>{playlistData.title}</h1> */}

      <table border="1">
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {songs.length > 0 && songs.map((song, index) => {
            return <MusicRow index={index} songData={song} playlists={allPlaylists} onLikePressed={likeSong} reloadPlaylists={reloadPlaylists} key={index}/>;
          })}
        </tbody>
      </table>
    </section>
    </>
  );
}

export default Playlist;