import { FaPlay } from 'react-icons/fa';
import './song-card.scoped.css'

function PlayButton (props) {
  return (
    <button className="play_button">
      <FaPlay/>
    </button>
  );
}



function SongCard ({songData}) {
  return (
    <article className="card">
      <div>
        <img src={songData.album.images[1].url} alt='albumImage' />
      </div>

      <div className="card-body">      
      <h2>{songData.name}</h2>
      <p>artist</p>
      <PlayButton/>
    </div>
    </article>
  );
}

function SongCards ({songs}) {  
  return (
    <div>
      <div className="app-card-list" id="app-card-list">
        {songs?.map((value, key)=>{
          return <SongCard songData={value}/>
        })
        }
      </div>
      
    </div>
  );
}


export default SongCards;