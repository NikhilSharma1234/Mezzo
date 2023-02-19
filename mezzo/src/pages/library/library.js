import './library.scoped.css'
import PlaylistCards from "../../components/cards/playlist-card.js";
import CreatePlaylist from "../../components/cards/playlist-card.js";
const Library = () => {
  return (
    <section className="main_closed main">
      <h1>Your Playlists</h1>
      <button id="create-playlist" onClick={CreatePlaylist}>Create a playlist</button>

      <PlaylistCards/>
    </section>
  );
};

export default Library;