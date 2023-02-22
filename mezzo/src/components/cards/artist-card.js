import "./card.scoped.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function ArtistCard({ artistData }) {
  const navigate = useNavigate();
  const navigateArtist = () => {
    navigate(`/_/artist/${artistData.id}`, { replace: true });
  };

  return (
    <button onClick={() => navigateArtist()} className="artist-card">
      <div>
        <img
          className="artist-photo"
          src={artistData.images[1].url}
          alt="artistImage"
        />
      </div>

      <h3>{artistData.name}</h3>
    </button>
  );
}

function ArtistCards({ artists }) {
  return (
    <div className="card-grid" id="card-grid">
      {artists.map((value, key) => {
        if (value.images && value.images.length > 0) {
          return <ArtistCard artistData={value} />;
        }
      })}
    </div>
  );
}

export default ArtistCards;
