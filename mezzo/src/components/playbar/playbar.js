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

const PlayBar = () => {
  const [playerInfo, , isPlaying, , setIsPlaying, queue, , , , removeFromQueue] = useContext(AudioContext);
  const [audio, setAudio] = useState(null);
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(-1);

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
  }, [isPlaying, playerInfo]);

  useEffect(() => {
    if (currentQueue >= 0 && currentQueueIndex < queue.length) {
      togglePlayer(queue[currentQueueIndex]);
      setCurrentQueueIndex((prevIndex) => prevIndex + 1);
    }
  }, [audio?.ended])

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

  function playFromQueue(index) {
    setCurrentQueueIndex(index);
  }

  return (
      <Box className="playbarbox" sx={{ pb: 7 }}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={10}
        >
          <BottomNavigation
            className="playbar"
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            
            <BottomNavigationAction className="playbar-btns"  label={playerInfo.songName || ""} >
              <img
                  className="charts-album-img"
                  src={playerInfo.albumImg}
                  alt=""
                />
                <div className="title-column-song-wrapper">
                <h4 id="charts-song-title">{playerInfo.songName}</h4><p>{playerInfo.artist}</p>
                </div>
            </BottomNavigationAction>
            <BottomNavigationAction icon={<FaHeart className="playbar-btns" />} />
            <BottomNavigationAction icon={<AiOutlineLeft className="playbar-btns" />} />
            <BottomNavigationAction
              onClick={togglePlaybarBtn}
              icon={isPlaying ? <BsPauseFill className="playbar-btns" /> : <BsFillPlayFill className="playbar-btns"  />}
            />
            <BottomNavigationAction icon={<AiOutlineRight className="playbar-btns" />} />
            <Box sx={{ width: 200, pt: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Slider
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
