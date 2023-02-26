import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import { MusicRow } from "../../components/musicTable/musicRow.js";
import { fetchSeveralTracks } from "../../utils/fetchSeveralTracks.js";
import { fetchPlaylist } from "../../utils/fetchPlaylist.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";
import { AudioContext } from "../../context/audioContext.js";



const Playlist=()=> {
  const { playlistID } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [allPlaylists, setAllPlaylists] = useState(null);
  const [songs, setSongs] = useState([]);
  const [likePressed, setLikePressed] = useState(false);
  const [, , , , , likeSongPressed, ] = useContext(AudioContext);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setAllPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, [likeSongPressed]);

  useEffect(() => {
    const fetchOnePlaylist = async () => {
      const playlist = await fetchPlaylist(playlistID);
      setPlaylist(playlist.playlist);
    };
    if (playlist && playlist.name === 'Liked Songs') fetchOnePlaylist();
  }, [likePressed]);

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
    setLikePressed(!likePressed);
  }

  return (
    <section className="main_closed main" id="charts-main">
      <div className='album-header'>
        <img src="https://i.pinimg.com/550x/00/c6/fc/00c6fcf866af801354c66822e24193a9.jpg" alt="Playlist Image" />
          <div className="album-header-body">
            <p>Playlist</p>
            <h1>{playlist && playlist.name}</h1>
            <p>{playlist && playlist.songs.length} Songs · {playlist && playlist.biography} </p>
          </div>
      </div>
      <table border="1" style={{marginTop: '30px'}}>
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {songs.length > 0 && songs.map((song, index) => {
            return <MusicRow index={index} songData={song} playlists={allPlaylists} onLikePressed={likeSong} reloadPlaylists={reloadPlaylists} key={index}/>;
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Playlist;