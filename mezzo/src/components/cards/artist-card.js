import './card.scoped.css'
import React, { useEffect, useRef } from 'react';

const ImageContainer = ({ src, alt }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const aspectRatio = image.naturalWidth / image.naturalHeight;
      containerRef.current.style.paddingBottom = `${100 / aspectRatio}%`;
    };
  }, [src]);

  return (
    <div ref={containerRef} className="image-container">
      <img className="artist-photo" src={src} alt={alt} />
    </div>
  );
};


function ArtistCard ({artistData}) {
      return (
      <div className="artist-card">
        <div>
        
          <img className="artist-photo" src={artistData.images[1].url} alt='artistImage' />
        </div>
       
        <h3>{artistData.name}</h3>
      </div>
    );
}

function ArtistCards({artists}) {
  return (
      <div className="card-grid" id="card-grid">
      {artists.map((value, key)=>{
          if(value.images && value.images.length > 0){
            return <ArtistCard artistData={value}/>
          }
        })
        }
      </div>
  );
}

export default ArtistCards