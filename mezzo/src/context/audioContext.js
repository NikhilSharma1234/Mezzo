import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songName: "", artist: "", albumImg: "", audioUrl: "" });
  const [isPlaying, setIsPlaying] = useState(null);
  const [queue, setQueue] = useState([]);

  function togglePlayer(newPlayerInfo = playerInfo, rewind = false, fastForward = false) {
    if (fastForward) {
      if (queue.length > 1) {
        const next_to_play = removeFromQueue();
        setPlayerInfo(next_to_play);
        setIsPlaying(true);
        return;
      }
    } else {
      if ((isPlaying && newPlayerInfo.audioUrl !== playerInfo.audioUrl) || rewind) {
        setPlayerInfo(newPlayerInfo);
        setIsPlaying(true);
      } else if (isPlaying && !rewind) {
        setIsPlaying(false);
      } else {
        setPlayerInfo(newPlayerInfo);
        setIsPlaying(true);
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
      value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, queue, setQueue, addToQueue, removeFromQueue, removeQueueElem]}
    >
      {children}
    </AudioContext.Provider>
  );
}
