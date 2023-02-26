import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songId: "", songName: "", artist: "", albumImg: "", audioUrl: "" });
  const [isPlaying, setIsPlaying] = useState(null);
  const [queue, setQueue] = useState([]);
  const [likeSongPressed, setLikeSong] = useState(false);

  function togglePlayer(newPlayerInfo = playerInfo, fastForward = false) {
    if (fastForward) {
      console.log('Fast Forward')
      if (queue.length >= 1) {
        const next_to_play = removeFromQueue();
        console.log(queue);
        setPlayerInfo(next_to_play);
      }
    } else {
      if (isPlaying && newPlayerInfo.audioUrl !== playerInfo.audioUrl) {
        setPlayerInfo(newPlayerInfo);
        setIsPlaying(true);
      } else if (!isPlaying){
        console.log('Starting')
        setPlayerInfo(newPlayerInfo);
        setIsPlaying(true);
      } else if (isPlaying) {
        console.log('Pausing')
        setIsPlaying(false);
      }
    }
  }

  function addToQueue(newPlayerInfo = playerInfo) {
    queue.push(newPlayerInfo)
  }

  function removeFromQueue() {
    const next_to_play = queue[0];
    queue.shift();
    return next_to_play;
  }

  function removeQueueElem(index) {
    queue.splice(index, 1);
  }

  return (
    <AudioContext.Provider
      value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, queue, setQueue, addToQueue, removeFromQueue, removeQueueElem, likeSongPressed, setLikeSong]}
    >
      {children}
    </AudioContext.Provider>
  );
}
