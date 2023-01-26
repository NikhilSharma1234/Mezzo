import '../../assets/global.scoped.css';
import { FaPlay } from 'react-icons/fa';
import SongCards from '../../components/song-card/song-card.js'
import ArtistCards from '../../components/artist-card/artist-card.js'
import SongData from '../../data/Data.json';

function PlayButton (props) {
  return (
    <button className="play_button">
      <FaPlay/>
    </button>
  );
}

const Home = () => {
  return (
    <section className="main_closed main">
      <div>
        {<SongCards posts={SongData}/>} 
      </div>
    </section>
  );
};

export default Home;