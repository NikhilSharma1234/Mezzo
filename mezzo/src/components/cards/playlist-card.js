import "./card.scoped.css";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AudioContext } from "../../context/audioContext.js";
import "./card.scoped.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function PlayButton({ songData }) {
  const [playerInfo, , isPlaying, togglePlayer] = useContext(AudioContext);

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

function PlaylistCard({
  playlistData = {
    id: "1",
    title: "playlist title",
    author: "author",
    cover: "./testPlaylistCover.jpg",
  },
}) {
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const navigatePlaylist = () => {
    navigate(`/_/playlist/${playlistData._id}`, { replace: true });
  };

  return (
    <>
      <button className="card" id="album-card" onClick={navigatePlaylist}>
        <div>
          <img
            src="https://i.pinimg.com/550x/00/c6/fc/00c6fcf866af801354c66822e24193a9.jpg"
            alt="playlistCover"
          />
        </div>

        <div className="card-body">
          <h2>{playlistData.name}</h2>
          <div className="card-caption">
            <p>{playlistData.biography}</p>
            <PlayButton songData={playlistData} />
          </div>
        </div>
      </button>
    </>
  );
}

function NewPlaylistCard(props) {
  const { reloadPlaylists } = props
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  const handleOnClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    event.preventDefault();
    setBio(event.target.value);
  };

  const reloadAllPlaylists = () => {
    reloadPlaylists();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = JSON.parse(localStorage.getItem('username'));
      const user = await fetch(process.env.REACT_APP_API_URL + "api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userID, name: name, biography: bio}),
      });
      reloadAllPlaylists();
      setName('');
      setBio('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card-new">
      <div onClick={handleOpen}>
        <FaPlus size={60}/>
      </div>
    <Dialog onClose={handleOnClose} open={open}>
    <DialogTitle>Create a new playlist</DialogTitle>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <h3>Playlist Name:</h3>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>

        <label>
          <h3>Description:</h3>
          <input
            type="text"
            placeholder="Enter a brief description (optional)"
            value={bio}
            onChange={handleBioChange}
          />
        </label>

        <input className="login-signup-btn" id="login-btn" type="submit" value="Create Playlist" />
      </form>
  </Dialog>
  </div>
  );
}

function PlaylistCards({ playlists, reloadPlaylists }) {
  return (
    <div className="card-grid" style={{margin: '10px 30px 10px 30px'}}>
      <NewPlaylistCard reloadPlaylists={reloadPlaylists} />
      {playlists?.map((value, key) => {
        return <PlaylistCard playlistData={value} key={key}/>;
      })}
    </div>
  );
}

export default PlaylistCards;
