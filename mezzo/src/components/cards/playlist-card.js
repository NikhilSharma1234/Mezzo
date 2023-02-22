import "./card.scoped.css";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AudioContext } from "../../context/audioContext.js";
import "./card.scoped.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function PlayButton({ songData }) {
  const [playerInfo, , isPlaying, togglePlayer] = useContext(AudioContext);

  function handlePlayer(songData) {
    const newPlayerInfo = {
      songName: songData.name,
      artist: songData.artist,
      songImg: songData.album.images[1].url,
      audioUrl: songData.preview_url,
    };
    togglePlayer(newPlayerInfo);
  }

  return (
    <>
      {songData.preview_url ? (
        <button className="play_button" onClick={() => handlePlayer(songData)}>
          {isPlaying && playerInfo.audioUrl === songData.preview_url ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
      ) : (
        <FaPlay />
      )}
    </>
  );
}

function PlaylistCard({
  playlistData = {
    id: "1",
    title: "playlist title",
    author: "author",
    cover: "./testPlaylistCover.jpg",
  },
}) {
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const navigatePlaylist = () => {
    navigate(`/_/playlist/${playlistData.id}`, { replace: true });
  };

  return (
    <>
      <button className="card" onClick={navigatePlaylist}>
        <div>
          <img
            src="https://i.pinimg.com/550x/00/c6/fc/00c6fcf866af801354c66822e24193a9.jpg"
            alt="playlistCover"
          />
        </div>

        <div className="card-body">
          <h2>{playlistData.title}</h2>
          <div className="card-caption">
            <p>{playlistData.author}</p>
            <PlayButton songData={playlistData} />
          </div>
        </div>
      </button>
    </>
  );
}

export function CreatePlaylist() {
  return <></>;
}

function NewPlaylistCard() {
  return (
    <button className="card" onClick={CreatePlaylist}>
      <FaPlus />
    </button>
  );
}

function PlaylistCards({ playlists }) {
  return (
    <div className="card-grid">
      <NewPlaylistCard />
      {/* {playlists?.map((value, key) => {
        return <PlaylistCard playlistData={value} />;
      })} */}
    </div>
  );
}

export default PlaylistCards;
