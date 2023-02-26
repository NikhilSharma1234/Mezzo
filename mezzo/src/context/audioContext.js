import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songId: "", songName: "", artist: "", albumImg: "", audioUrl: "" });
  const [isPlaying, setIsPlaying] = useState(null);
  const [likeSongPressed, setLikeSong] = useState(false);

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
      value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer, setIsPlaying, likeSongPressed, setLikeSong]}
    >
      {children}
    </AudioContext.Provider>
  );
}
