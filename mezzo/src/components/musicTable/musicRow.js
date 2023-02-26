import React, { useState, useContext } from "react";
import "./musicRow.scoped.css";
import { AudioContext } from "../../context/audioContext.js";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillHeart } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';


function SimpleDialog(props) {
  const { onClose, open, playlists, reloadPlaylists } = props;
  const [form, setForm] = React.useState(null);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  const handleClose = () => {
    onClose(null);
  };
  const subtext = (playlist) => {
    if (playlist.biography === 'Nothing Here...')
      return `Playlist | ${playlist.songs.length} songs`
    else
      return `Playlist | ${playlist.biography} | ${playlist.songs.length} songs`
  }

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const reloadAllPlaylists = () => {
    reloadPlaylists();
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    event.preventDefault();
    setBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = JSON.parse(localStorage.getItem('username'));
      const user = await fetch("http://localhost:4000/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userID, name: name, biography: bio}),
      });
      reloadAllPlaylists();
      setForm(false);
      setName('');
      setBio('');
    } catch (error) {
      console.log(error);
    }
  };

  const newPlaylist = () => {
    console.log("New playlist")
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose Playlist to add song to</DialogTitle>
      <List sx={{ pt: 0 }}>
        {playlists.map((playlist, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton onClick={() => handleListItemClick(playlist.name)} key={index}>
              <ListItemText primary={playlist.name} secondary={subtext(playlist)}/>
            </ListItemButton>
          </ListItem>
        ))}
        <hr></hr>
        {!form &&
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => setForm(true)}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add playlist" />
          </ListItemButton>
        </ListItem>
        }
        {form &&
        <form class="login-form" onSubmit={handleSubmit}>
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
        }
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export const MusicRow = ({ index, songData, playlists, onLikePressed, reloadPlaylists}) => {
  const [playerInfo, , isPlaying, togglePlayer] = useContext(AudioContext);
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [chosenSong, setChosenSong] = useState(null);

  function handlePlayer() {
    const newPlayerInfo = {
      songId: songData.id,
      songName: songData.album.name,
      artist: songData.artists[0].name,
      albumImg: songData.album.images[2].url,
      audioUrl: songData.preview_url,
    };
    togglePlayer(newPlayerInfo);
  }

  function likeSong(playlistName, id) {
    onLikePressed(playlistName, id);
  }

  const handleClickOpen = (id) => {
    setOpen(true);
    setChosenSong(id);
  };

  const handleClose = (value) => {
    setOpen(false);
    likeSong(value, chosenSong);
  };

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

  function numberFormatting(index) {
    let string = index.toString();
    string = string.padStart(3, '00');
    return string
  }

  function millisecToMin(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <tr>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        playlists={playlists}
        reloadPlaylists={reloadPlaylists}
      />
      <td
        className="position-column"
        onMouseOver={() => setShowButton(index)}
        onMouseOut={() => setShowButton(-1)}
      >
        {songData.preview_url ? (
          showButton === index ? (
            <button onClick={() => handlePlayer()}>
              {isPlaying && playerInfo.audioUrl === songData.preview_url ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
          ) : (
            <p>{numberFormatting(index + 1)}</p>
          )
        ) : (
          <p>{numberFormatting(index + 1)}</p>
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
      <td>
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: '0 auto'}}>
          <IconButton onClick={() => likeSong("Liked Songs", songData.id)}>
            <AiFillHeart style={ heartStyling(songData) }/>
          </IconButton>
          <IconButton id="add-to-playlist" onClick={() => handleClickOpen(songData.id)}>
            <MdOutlinePlaylistAdd />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};
