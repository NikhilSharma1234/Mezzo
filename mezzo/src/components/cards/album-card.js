import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AudioContext } from "../../context/audioContext.js";
import "./card.scoped.css";
import React, {useContext } from "react";
import { useNavigate } from "react-router-dom";

function AlbumCard({ albumData }) {
  const navigate = useNavigate();
  const navigateAlbum = () => {
    navigate(`/_/album/${albumData.id}`, { replace: true });
  };

  return (
    <div className="card" id="album-card" onClick={() => navigateAlbum()}>
      <div>
        <img src={albumData.images[1].url} alt="albumImage" />
      </div>

      <div className="card-body">
        <h2>{albumData.name}</h2>
        <div className="card-caption">
          <p>{albumData.release_date.slice(0, 4)} · album</p>
          {/* <Heart />
          <PlayButton songData={songData} /> */}
        </div>
      </div>
    </div>
  );
}

function AlbumCards({ albumsData }) {
  return (
    <div className="card-grid">
      {albumsData?.map((value, key) => {
        return <AlbumCard albumData={value} />;
      })}
    </div>
  );
}

export default AlbumCards;
