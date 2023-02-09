import SearchBar from "../../components/searchbar/searchbar.js";
import SongCards from "../../components/cards/song-card.js";
import ArtistCards from "../../components/cards/artist-card.js";
import "./discover.scoped.css";
import { fetchArtistTopTracks } from "../../utils/fetchArtistTopTracks.js";
import React, { useState, useEffect } from "react";
import { fetchSearchResults } from "../../utils/fetchSearchResults.js";

const Discover = () => {
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const updateSearchInput = (newSearchInput) => {
    setSearchInput(newSearchInput);
  };

  useEffect(() => {
    const fetchTopTracksData = async () => {
      const topTracks = await fetchArtistTopTracks(searchInput.id);
      setSongs(topTracks);
    };

    const fetchTracksData = async () => {
      const tracksData = await fetchSearchResults(searchInput.name, "track");
      setSongs(tracksData);
    };

    const fetchArtistsData = async () => {
      const similarArtists = await fetchSearchResults(
        searchInput.name,
        "artist"
      );
      setArtists(similarArtists);
    };

    if (searchInput) {
      if (searchInput.type && searchInput.type === "artist") {
        fetchTopTracksData();
      } else {
        fetchTracksData();
      }
      fetchArtistsData();
    }
  }, [searchInput]);

  return (
    <section className="main main_closed">
      <SearchBar
        placeholder="Enter a song/artist"
        searchInput={searchInput}
        setSearchInput={updateSearchInput}
      />
      <section className="Songs-Section">
        <div>
          <h3 id="SongHeading">Songs</h3>

          {songs.length !== 0 && <SongCards songs={songs} />}
        </div>

        <div>
          <h3 id="ArtistHeading">Artists</h3>
          {artists.length !== 0 && <ArtistCards artists={artists} />}
        </div>
      </section>
    </section>
  );
};

export default Discover;
