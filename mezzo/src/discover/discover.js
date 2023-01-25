import SearchBar from "/home/fchau/Documents/TechWiseProjectTwoTeamTwo/mezzo/src/main-components/search-bar/searchbar.js";
import SongData from '/home/fchau/Documents/TechWiseProjectTwoTeamTwo/mezzo/src/Data.json';

const Discover = () => {
  return (
    <div className="main-panel">
        <SearchBar placeholder="Enter a song/artist" data={SongData}/>
    </div>

  );
};

export default Discover;


// <section className="Songs-Section">
// <h3>Songs</h3>

// <div>
//     {<Cards posts={SongData}/>} 
// </div>

// </section>

// <section className="Artists-Section">
// <h3>Artists</h3>
// <div>
//     {<Cards posts={SongData}/>} 
// </div>

// </section>