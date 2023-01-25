import SearchBar from "../../components/searchbar/searchbar.js";
import SongData from '../../data/Data.json';
import SongCards from '../../components/song-card/song-card.js'
import ArtistCards from '../../components/artist-card/artist-card.js'
import './discover.css'

const Discover = () => {
  return (
    <div className="main-panel">
        <SearchBar placeholder="Enter a song/artist" data={SongData}/>

        <section className="Songs-Section">
        

        <div>
        <h3 id="SongHeading">Songs</h3>
            {<SongCards posts={SongData}/>} 
        </div>

        <div>
        <h3 id="ArtistHeading">Artists</h3>
            {<ArtistCards posts={SongData}/>} 
        </div>

        </section>
        
    </div>

    

  );
};

export default Discover;




// <section className="Artists-Section">
// <h3>Artists</h3>
// <div>
//     {<Cards posts={SongData}/>} 
// </div>

// </section>