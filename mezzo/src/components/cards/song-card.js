import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdOutlineQueueMusic as MDQueue } from "react-icons/md" 
import { MdChecklistRtl as MDQueueCheck } from "react-icons/md"
import { AudioContext } from "../../context/audioContext.js";
import "./card.scoped.css";
import {useContext } from "react";

function PlayButton({ songData }) {
    const [playerInfo, , isPlaying, togglePlayer, , queue, addToQueue, , removeQueueElem] = useContext(AudioContext);


  function convertToPlayer(song){
    const newPlayerInfo = {
      songName: songData.name,
      artist: songData.artists[0].name,
      albumImg: albumImg,
      audioUrl: songData.preview_url,
    };
    return PlayerInfo;
  }

  function handlePlayer(song) {
    newPlayerInfo = convertToPlayer(song);
    togglePlayer(newPlayerInfo);
  }

  function handleQueueCheck(song) {
    PlayerInfo = convertToPlayer(song);
    if (queue.includes(PlayerInfo)) {
      queue.removeQueueElem(queue.indexOf(PlayerInfo));
    } else {
      addToQueue()
    }
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
      <>
        <button onClick={() => handleQueueCheck(songData)}>
          {queue.includes(convertToPlayer(songData)) ? (
            <MDQueueCheck />
          ) : (
            <MDQueue />
          )}
        </button>
      </>
    </>

  );
}

function Heart(props) {
  return (
    <button className="play_button">
      <FaHeart size={15} color="var(--song-card-color)" />
    </button>
  );
}

function SongCard({ songData }) {
  return (
    <div className="card" id="song-card">
      <div>
        <img src={songData.album.images[1].url} alt="albumImage" />
      </div>

      <div className="card-body">
        <h2>{songData.name}</h2>
        <div className="card-caption">
          <p>artist</p>
          <Heart />
          <PlayButton songData={songData} />
        </div>
      </div>
    </div>
  );
}

function SongCards({ songs }) {
  return (
    <div className="card-grid">
      {songs?.map((value, key) => {
        return <SongCard songData={value} />;
      })}
    </div>
  );
}

export default SongCards;
