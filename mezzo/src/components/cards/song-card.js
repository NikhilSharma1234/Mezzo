import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdOutlineQueueMusic as MDQueue } from "react-icons/md" 
import { MdChecklistRtl as MDQueueCheck } from "react-icons/md"
import { AudioContext } from "../../context/audioContext.js";
import IconButton from '@mui/material/IconButton';
import "./card.scoped.css";
import {useContext } from "react";

function convertToPlayer(songData){
  const PlayerInfo = {
    songId: songData.id,
    songName: songData.name,
    artist: songData.artist,
    songImg: songData.album.images[1].url,
    audioUrl: songData.preview_url,
  };
  return PlayerInfo;
}


function PlayButton({ songData }) {
  const [playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, queue, setQueue, addToQueue, removeFromQueue, removeQueueElem] = useContext(AudioContext);

  function handlePlayer(song) {
    const newPlayerInfo = convertToPlayer(song);
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

function SongCard({ songData }) {
  const [playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, queue, setQueue, addToQueue, removeFromQueue, removeQueueElem] = useContext(AudioContext);

  function handleQueueCheck(song) {
    const PlayerInfo = convertToPlayer(song);
    console.log(queue);
    if (queue.includes(PlayerInfo)) {
      removeQueueElem(queue.indexOf(PlayerInfo));
    } else {
      addToQueue(PlayerInfo)
    }
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
          <button className="play_button" onClick={() => handleQueueCheck(songData)}>
            {queue.includes(convertToPlayer(songData)) ? (
              <MDQueueCheck />
            ) : (
              <MDQueue />
            )}
          </button>
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
