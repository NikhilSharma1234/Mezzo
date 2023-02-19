import React, { useState, useContext, useEffect } from "react";
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
  const { onClose, open, playlists } = props;

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const newPlaylist = () => {
    console.log("New playlist")
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose Playlist to add song to</DialogTitle>
      <List sx={{ pt: 0 }}>
        {playlists.map(({name}) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(name)} key={name}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => newPlaylist()}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add playlist" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export const MusicRow = ({ index, songData, playlists, onLikePressed }) => {
  const [playerInfo, , isPlaying, togglePlayer] = useContext(AudioContext);
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [chosenSong, setChosenSong] = useState(null);

  function handlePlayer(song) {
    const newPlayerInfo = {
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
      <SimpleDialog
        open={open}
        onClose={handleClose}
        playlists={playlists}
      />
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
      <td>
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: '0 auto'}}>
          <IconButton onClick={() => likeSong("Liked Songs", songData.id)}>
            <AiFillHeart style={ heartStyling(songData) }/>
          </IconButton>
          <IconButton onClick={() => handleClickOpen(songData.id)}>
            <MdOutlinePlaylistAdd style={{ color: 'white' }}/>
          </IconButton>
        </div>
      </td>
    </tr>
  );
};
