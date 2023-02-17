import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AudioContext } from "../../context/audioContext.js";
import "./card.scoped.css";
import {useContext } from "react";

function PlayButton({ songData }) {
  const [playerInfo,, isPlaying, togglePlayer] = useContext(
    AudioContext
  );

  function handlePlayer(songData) {
    const newPlayerInfo = {
      songName: songData.name,
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

function Heart(props) {
  return (
    <button className="play_button">
      <FaHeart size={15} color="var(--song-card-color)" />
    </button>
  );
}

function SongCard({ songData }) {
  return (
    <div className="card">
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
