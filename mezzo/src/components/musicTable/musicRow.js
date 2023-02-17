import React, { useState, useContext } from "react";
import "./musicRow.scoped.css";
import { AudioContext } from "../../context/audioContext.js";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


export const MusicRow = ({ index, songData }) => {
  const [playerInfo, , isPlaying, togglePlayer] = useContext(AudioContext);
  const [showButton, setShowButton] = useState(false);

  function handlePlayer(song) {
    const newPlayerInfo = {
      songName: songData.album.name,
      artist: songData.artists[0].name,
      albumImg: songData.album.images[2].url,
      audioUrl: songData.preview_url,
    };
    togglePlayer(newPlayerInfo);
  }

  function millisecToMin(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // function getWeeks(release) {
  //   const releaseDate = new Date(release);
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
  //   const formattedDate = currentDate.toLocaleDateString();
  //   console.log(formattedDate); // Output: the current date in the format MM/DD/YYYY
  //   const diffInMs = currentDate - releaseDate;
  //   const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  //   return diffInWeeks;
  // }

  return (
    <tr>
      <td
        className="position-column"
        onMouseOver={() => setShowButton(index)}
        onMouseOut={() => setShowButton(-1)}
      >
        {songData.preview_url ? (
          showButton === index ? (
            <button onClick={() => handlePlayer(songData)}>
              {isPlaying && playerInfo.audioUrl === songData.preview_url ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
          ) : (
            <p>{index + 1}</p>
          )
        ) : (
          <p>{index + 1}</p>
        )}
      </td>
      <td className="title-column">
        <img
          className="charts-album-img"
          src={songData.album.images[2].url}
          alt=""
        />
        <div className="title-column-song-wrapper">
          <h4 id="charts-song-title">{songData.name}</h4>
          <p>{songData.artists[0].name}</p>
        </div>
      </td>
      <td>{songData.album.name}</td>
      <td>{songData.album.release_date}</td>
      <td>{millisecToMin(songData.duration_ms)}</td>
    </tr>
  );
};
