import "./card.scoped.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function ArtistCard({ artistData }) {
  const navigate = useNavigate();
  const navigateArtist = () => {
    navigate(`/_/artist/${artistData.id}`, { replace: true });
  };

  return (
    <div className="artist-card">
        <img
          className="artist-photo"
          src={artistData.images[0].url}
          alt="artistImage"
          onClick={() => navigateArtist()}
        />
      <h1 style={{fontSize: 'initial',marginTop: '2vh'}}>{artistData.name}</h1>
    </div>
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
