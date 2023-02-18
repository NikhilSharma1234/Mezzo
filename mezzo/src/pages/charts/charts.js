import React, { useState, useEffect, useContext } from "react";
import "./charts.css";
import { fetchTop100 } from "../../utils/fetchTop100.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";
import {AudioContext } from "../../context/audioContext.js";
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
  const { onClose, selectedValue, open, playlists } = props;

  const handleClose = () => {
    onClose(selectedValue);
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
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};


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

  const handleClickOpen = (song) => {
    setOpen(true);
    setChosenSong(song);
  };

  const handleClose = (value) => {
    setOpen(false);
    likeSong(value, chosenSong.track.id);
  };

  function findLikedSongs(song) {
    const likedSongs = playlists.find(({name}) => name === 'Liked Songs');
    if (likedSongs.songs.includes(song.track.id))
      return {
        color: 'red',
        paddingRight: '40px'
      };
    else {
      return {
        color: 'black',
        paddingRight: '40px'
      };
    }
  }

  const heartStyling = (song) => {
    return findLikedSongs(song)
  }

  return (
    <section className="main_closed main">
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        playlists={playlists}
      />
      <table border="1">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Position</th>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Length</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {parsedTop100.map((song, index) => (
            <tr key={index}>
              <td>
              <IconButton onClick={() => likeSong("Liked Songs", song.track.id)}>
                <AiFillHeart style={ heartStyling(song) }/>
              </IconButton>
              <IconButton onClick={() => handleClickOpen(song)}>
                <MdOutlinePlaylistAdd style={{ color: 'white' }}/>
              </IconButton>
              </td>
              <td
                onMouseOver={() => setShowButton(index)}
                onMouseOut={() => setShowButton(-1)}
              >
                {song.track.preview_url ? (
                  showButton === index ? (
                    <button onClick={() => handlePlayer(song)}>
                      {isPlaying &&
                      playerInfo.audioUrl === song.track.preview_url
                        ? "Pause"
                        : "Play"}
                    </button>
                  ) : (
                    <p>{index + 1}</p>
                  )
                ) : (
                  <p>{index + 1}</p>
                )}
              </td>
              <td>
                <img
                  className="charts-album-img"
                  src={song.track.album.images[2].url}
                  alt=""
                />
                {song.track.name}
              </td>
              <td>{song.track.album.name}</td>
              <td>{song.track.artists[0].name}</td>
              <td>{millisecToMin(song.track.duration_ms)}</td>
              <td>{song.track.album.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Charts;
