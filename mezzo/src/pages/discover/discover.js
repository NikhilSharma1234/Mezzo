import SearchBar from "../../components/searchbar/searchbar.js";
import SongData from '../../data/Data.json';
import SongCards from '../../components/song-card/song-card.js'
import ArtistCards from '../../components/artist-card/artist-card.js'
import spotifyTracks from '../../data/tracks.json';
import './discover.scoped.css'

const Discover = () => {

  console.log('discover page')
  return (
    <section className="main main_closed">
        <div>
            <SearchBar placeholder="Enter a song/artist" data={SongData}/>

            <section className="Songs-Section">
            

            <div>
            <h3 id="SongHeading">Songs</h3>
                {<SongCards posts={spotifyTracks}/>} 
            </div>

            <div>
            <h3 id="ArtistHeading">Artists</h3>
                {<ArtistCards posts={SongData}/>} 
            </div>

            </section>
            
        </div>
    </section>
  );
};

export default Discover;
