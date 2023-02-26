import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AudioContext } from "../../context/audioContext.js";
import IconButton from '@mui/material/IconButton';
import "./card.scoped.css";
import {useContext } from "react";

function PlayButton({ songData }) {
  const [playerInfo,, isPlaying, togglePlayer] = useContext(
    AudioContext
  );

  function handlePlayer(songData) {
    const newPlayerInfo = {
      songId: songData.id,
      songName: songData.name,
      artist: songData.artist,
      songImg: songData.album.images[1].url,
      audioUrl: songData.preview_url,
    };
    togglePlayer(newPlayerInfo);
  }

  return (
    <>
      {songData.preview_url ? (
        <button className="play_button" onClick={() => handlePlayer(songData)}>
          {isPlaying && playerInfo.audioUrl === songData.preview_url ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
      ) : (
        <FaPlay />
      )}
    </>
  );
}

function SongCard({ songData, playlists, onLikePressed }) {

  function likeSong(playlistName, id) {
    onLikePressed(playlistName, id);
  }

  function findLikedSongs(song) {
    const likedSongs = playlists.find(({name}) => name === 'Liked Songs');
    if (likedSongs.songs.includes(song.id))
      return {
        color: 'red'
      };
    else {
      return {
        color: 'black'
      };
    }
  }

  const heartStyling = (song) => {
    return findLikedSongs(song)
  }

  return (
    <div className="card" id="song-card">
      <div>
        <img src={songData.album.images[1].url} alt="albumImage" />
      </div>

      <div className="card-body">
        <h2>{songData.name}</h2>
        <div className="card-caption">
          <p>artist</p>
          <IconButton onClick={() => likeSong("Liked Songs", songData.id)}>
            <FaHeart size={15} style={ heartStyling(songData) }/>
          </IconButton>
          <PlayButton songData={songData} />
        </div>
      </div>
    </div>
  );
}

function SongCards({ songs, playlists, onLikePressed }) {
  return (
    <div className="card-grid">
      {songs?.map((value) => {
        return <SongCard songData={value} playlists={playlists} onLikePressed={onLikePressed} />;
      })}
    </div>
  );
}

export default SongCards;
