import './../App.css';
import { FaPlay } from 'react-icons/fa';

const SongData = [
  {
    "genre": "Country",
    "song": "Coutry Song",
    "artist": "Blake Shelton",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Rap",
    "song": "Rap Song",
    "artist": "Post Malone",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Pop",
    "song": "Pop Song",
    "artist": "A$AP Rocky",
    "image": "https://via.placeholder.com/30x30"
  },
  {
    "genre": "Pop",
    "song": "Pop Song",
    "artist": "Nicki Minaj",
    "image": "https://via.placeholder.com/40x10"
  },
  {
    "genre": "Rap",
    "song": "Rap Song",
    "artist": "Lil Wayne",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Blues",
    "song": "Blues Song",
    "artist": "Blues Artist",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Lo-Fi",
    "song": "Chill Beats 24/7",
    "artist": "Lo-Fi Girl",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Electronic",
    "song": "Confusion",
    "artist": "Electronic Light Orchestra",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Folk-Soul",
    "song": "Yesterday",
    "artist": "Beatles",
    "image": "https://via.placeholder.com/600x400"
  },
  {
    "genre": "Jazz",
    "song": "Jazz Song",
    "artist": "Jazz Artist",
    "image": "https://via.placeholder.com/600x400"
  }
]

function PlayButton (props) {
  return (
    <button className="play_button">
      <FaPlay/>
    </button>
  );
}

function CardHeader (props) {
  const element = <div style={{ backgroundImage: `url('${props.image}')` }} />
  return (
    <header style={{backgroundImage:`url(${props.image})`}} className="card-header">{element}
      <h4 className="card-header">{props.genre}</h4>
    }
    </header>
  );
}


function CardBody (props) {
  return (
    <div className="card-body">      
      <h2>{props.song}</h2>
      <p>{props.artist}</p>
      <PlayButton/>
    </div>
  );
}


function Card (props) {
  return (
    <article className="card">
      <CardHeader genre={props.details.genre} image={props.details.image}/>
      <CardBody song={props.details.song} artist={props.details.artist}/>
    </article>
  );
}

function Cards (props) {  
  return (
    <div>
      <header></header>
      <div className="app-card-list" id="app-card-list">
        {
          Object
          .keys(props.posts)
          .map(key => <Card key={key} index={key} details={props.posts[key]}/>)
        }
      </div>
    </div>
  );
}

const Home = () => {
  return (
    <section className="main_closed main">
      <div>
        {<Cards posts={SongData}/>} 
      </div>
    </section>
  );
};

export default Home;