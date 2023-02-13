import { FaPlay } from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
import './card.scoped.css'

function PlayButton (props) {
  
  return (
    <button className="play_button">
      <FaPlay/>
    </button>
  );
}

function Heart (props) {
  return (
    <button className="play_button">
      <FaHeart size={15} color="var(--song-card-color)"/>
    </button>
  );
}

function SongCard ({songData}) {
  console.log(songData);
  return (
    <div className="card">
      <div>
        <img src={songData.album.images[1].url} alt='albumImage' />
      </div>

      <div className="card-body">      
        <h2>{songData.name}</h2>
        <div className="card-caption">
          <p>artist</p>
          <Heart/>
          <PlayButton preview={songData.preview_url}/>
        </div>
      </div>
    </div>
  );
}

function SongCards ({songs}) {  
  return (
      <div className="card-grid">
        {songs?.map((value, key)=>{
          return <SongCard songData={value}/>
        })
      }
      </div>
  );
}


export default SongCards;