import "../../assets/global.scoped.css";
import "./playbar.css";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { AudioContext } from "../../context/audioContext.js";
import { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";

const PlayBar = () => {
  const [playerInfo, , isPlaying, , setIsPlaying, likeSongPressed, setLikeSong] = useContext(AudioContext);
  const [likedSongsPlaylist, setLikedSongsPlaylist] = useState(null)
  const [audio, setAudio] = useState(null);
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
      setLikedSongsPlaylist(allPlaylists.playlists.find(({name}) => name === "Liked Songs"));
    };
    fetchPlaylists();
  }, [likeSongPressed]);

  useEffect(() => {
    if (playerInfo.audioUrl) {
      if (isPlaying) {
        if (audio) {
          audio.pause();
        }
        const audioElement = new Audio(playerInfo.audioUrl);
        audioElement.volume = volume;
        audioElement.play();
        setAudio(audioElement);
      } else {
        audio.pause();
      }
    }
    // eslint-disable-next-line
  }, [isPlaying, playerInfo]);

  useEffect(() => {
    if (value == 1 && playerInfo.songId) {
      handleLikePress()
      setValue(0)
    }
  }, [value])

  function handleLikePress() {
    const fetchPlaylistsDislike = async () => {
      await dislikeSongPut("Liked Songs", playerInfo.songId);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
      setLikedSongsPlaylist(allPlaylists.playlists.find(({name}) => name === "Liked Songs"))
    };
    const fetchPlaylists = async () => {
      await likeSongPost("Liked Songs", playerInfo.songId);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
      setLikedSongsPlaylist(allPlaylists.playlists.find(({name}) => name === "Liked Songs"))
    };

    const playlist = playlists.find(({name}) => name === "Liked Songs");
    if (playlist.songs.includes(playerInfo.songId)) {
      fetchPlaylistsDislike();
    }
    else {
      fetchPlaylists();
    }
    setLikeSong(!likeSongPressed);
  }

  function togglePlaybarBtn() {
    if (isPlaying || playerInfo.songName === "") {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  function handleVolume(event, newVolume) {
    setVolume(newVolume);
    if (isPlaying) {
      audio.volume = volume;
    }
  }
  const heartStyling = () => {
    if (likedSongsPlaylist && likedSongsPlaylist.songs.includes(playerInfo.songId))
      return {
        color: 'red'
      };
    else {
      return {
        color: 'black'
      };
    }
  }
  return (
      <Box className="playbarbox" sx={{ pb: 7 }}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={10}
        >
          <BottomNavigation
            className="playbar"
            value={value}
            showLabels
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            
            <BottomNavigationAction className="playbar-btns"  style={{color: 'white'}} label={playerInfo.songName || "Not playing"}>
            </BottomNavigationAction>
            <BottomNavigationAction icon={<FaHeart className="playbar-btns" style={ heartStyling()}/>} />
            <BottomNavigationAction icon={<AiOutlineLeft className="playbar-btns" />} />
            <BottomNavigationAction
              onClick={togglePlaybarBtn}
              icon={isPlaying ? <BsPauseFill className="playbar-btns" /> : <BsFillPlayFill className="playbar-btns"  />}
            />
            <BottomNavigationAction icon={<AiOutlineRight className="playbar-btns" />} />
            <Box sx={{ width: 200, pt: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Slider
                  sx={{color:"white"}}
                  aria-label="Volume"
                  onChange={handleVolume}
                  min={0}
                  max={1}
                  value={volume}
                  step={0.01}
                />
              </Stack>
            </Box>
          </BottomNavigation>
        </Paper>
      </Box>
  );
};

export default PlayBar;
