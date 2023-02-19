import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songName: "", artist: "", albumImg: "", audioUrl: "" });
  const [isPlaying, setIsPlaying] = useState(null);

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

  return (
    <AudioContext.Provider
      value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying]}
    >
      {children}
    </AudioContext.Provider>
  );
}
