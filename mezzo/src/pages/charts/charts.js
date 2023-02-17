import React, { useState, useEffect, useContext } from "react";
import "./charts.css";
import { fetchTop100 } from "../../utils/fetchTop100.js";
import { AudioContext } from "../../context/audioContext.js";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const Charts = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [playerInfo,, isPlaying, togglePlayer] = useContext(
    AudioContext
  );
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [chosenSong, setChosenSong] = useState(null);

  useEffect(() => {
    const fetchTop = async () => {
      const top100 = await fetchTop100();
      setSongs(top100);
    };

    fetchTop();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };

    fetchPlaylists();
  }, []);

  let parsedTop100 = songs.map(song => {
    let obj = Object.assign({}, song);
    delete obj.added_by;
    delete obj.added_at;
    delete obj.is_local;
    delete obj.primary_color;
    delete obj.video_thumbnail;
    return obj;
  });

  function handlePlayer(song) {
    const newPlayerInfo = {
      songName: song.track.album.name,
      audioUrl: song.track.preview_url,
    };
    togglePlayer(newPlayerInfo);
  }

  function likeSong(value, song) {
    const fetchPlaylistsDislike = async () => {
      await dislikeSongPut(value, song);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
    };
    const fetchPlaylists = async () => {
      await likeSongPost(value, song);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };

    const playlist = playlists.find(({name}) => name === value);
    if (playlist.songs.includes(song)) {
      fetchPlaylistsDislike();
    }
    else {
      fetchPlaylists();
    }
  }

  function millisecToMin(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function getWeeks(release){
    const releaseDate = new Date(release);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
    const formattedDate = currentDate.toLocaleDateString();
    console.log(formattedDate); // Output: the current date in the format MM/DD/YYYY
    const diffInMs = currentDate - releaseDate;
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    return diffInWeeks;
  }

  return (
    <section className="main_closed main" id="charts-main">
      <h1>Top 100</h1>
      <table border="1">
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Album</th>
            <th>Wks on Chart</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {parsedTop100.map((song, index) => (
            <tr key={index}>
              <td className="position-column"
                onMouseOver={() => setShowButton(index)}
                onMouseOut={() => setShowButton(-1)}
              >
                {song.track.preview_url ? (
                  showButton === index ? (
                    <button onClick={() => handlePlayer(song)}>
                      {isPlaying &&
                      playerInfo.audioUrl === song.track.preview_url
                        ? <FaPause/>
                        : <FaPlay/>}
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
                  src={song.track.album.images[2].url}
                  alt=""
                />
                <div className="title-column-song-wrapper">
                <h4 id="charts-song-title">{song.track.name}</h4><p>{song.track.artists[0].name}</p>
                </div>
              </td>
              <td>{song.track.album.name}</td>
              <td>{getWeeks(song.track.album.release_date)}</td>
              <td>{millisecToMin(song.track.duration_ms)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Charts;
