import { FaPlay } from 'react-icons/fa';


function PlayButton (props) {
  return (
    <button className="play_button">
      <FaPlay/>
    </button>
  );
}

function SongCardHeader (props) {
  const element = <div style={{ backgroundImage: `url('${props.image}')` }} />
  return (
    <header style={{backgroundImage:`url(${props.image})`}} className="card-header">{element}
      <h4 className="card-header">{props.genre}</h4>
    }
    </header>
  );
}


function SongCardBody (props) {
  return (
    <div className="card-body">      
      <h2>{props.song}</h2>
      <p>{props.artist}</p>
      <PlayButton/>
    </div>
  );
}


function SongCard (props) {
  return (
    <article className="card">
      <SongCardHeader genre={props.details.genre} image={props.details.image}/>
      <SongCardBody song={props.details.song} artist={props.details.artist}/>
    </article>
  );
}

function SongCards (props) {  
  return (
    <div>
      <header></header>
      <div className="app-card-list" id="app-card-list">
        {
          Object
          .keys(props.posts)
          .map(key => <SongCard key={key} index={key} details={props.posts[key]}/>)
        }
      </div>
    </div>
  );
}


export default SongCards;