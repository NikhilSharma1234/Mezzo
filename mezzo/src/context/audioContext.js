import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songName: "", artist: "", albumImg: "", audioUrl: "" });
  const [isPlaying, setIsPlaying] = useState(null);
  const [queue, setQueue] = useState([]);



  function togglePlayer(newPlayerInfo = playerInfo) {
    if (isPlaying && newPlayerInfo.audioUrl !== playerInfo.audioUrl) {
      setPlayerInfo(newPlayerInfo);
      setIsPlaying(true);
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayerInfo(newPlayerInfo);
      setIsPlaying(true);
    }
  }

  function addToQueue(newSong) {
    setQueue((prevQueue) => [...prevQueue, newSong]);
  }

  function removeFromQueue(index) {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue.splice(index, 1);
      return newQueue;
    });
  }

  return (
    <AudioContext.Provider
      value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, queue, setQueue, addToQueue, removeFromQueue]}
    >
      {children}
    </AudioContext.Provider>
  );
}
