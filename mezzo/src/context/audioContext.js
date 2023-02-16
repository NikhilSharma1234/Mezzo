import { createContext, useState } from 'react';

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playerInfo, setPlayerInfo] = useState({ songName: '', audioUrl: ''});
  const [isPlaying, setIsPlaying] = useState(true);

  function togglePlayer(){
    console.log("togglePlayer")
    console.log(playerInfo.audioUrl)
    if (isPlaying) {
        setIsPlaying(false);
    } else {
        setIsPlaying(true);
    }
  }

  return (
    <AudioContext.Provider value={[playerInfo, setPlayerInfo, isPlaying, togglePlayer]}>
      {children}
    </AudioContext.Provider>
  );
}