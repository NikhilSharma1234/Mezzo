import './artist-card.scoped.css'


function ArtistCard ({artistData}) {
      return (
      <article className="artist-card">
        <div>
          <img className="artist-photo" src={artistData.images[1].url} alt='artistImage' />
        </div>
       
        <h3>{artistData.name}</h3>
      </article>
    );
}

function ArtistCards({artists}) {
  return (
    <div>
      <div className="app-card-list" id="app-card-list">
      {artists.map((value, key)=>{
          if(value.images && value.images.length > 0){
            return <ArtistCard artistData={value}/>
          }
        })
        }
      </div>
    </div>
  );
}

export default ArtistCards