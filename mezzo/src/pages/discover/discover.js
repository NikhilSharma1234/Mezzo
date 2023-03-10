import SearchBar from "../../components/searchbar/searchbar.js";
import SongCards from "../../components/cards/song-card.js";
import ArtistCards from "../../components/cards/artist-card.js";
import AlbumCards from "../../components/cards/album-card.js";
import { AudioContext } from "../../context/audioContext.js";
import "./discover.scoped.css";
import { fetchArtistTopTracks } from "../../utils/fetchArtistTopTracks.js";
import React, { useState, useEffect, useContext } from "react";
import { fetchSearchResults } from "../../utils/fetchSearchResults.js";
import { fetchNewReleases } from "../../utils/fetchNewReleases.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";

const Discover = () => {
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likePressed, setLikePressed] = useState(false);
  const [, , , , , likeSongPressed] = useContext(AudioContext);
  const updateSearchInput = (newSearchInput) => {
    setSearchInput(newSearchInput);
  };

  useEffect(() => {
    const fetchNewReleaseData = async () => {
      const newReleaseData = await fetchNewReleases(10);
      setNewReleases(newReleaseData);
    };
    fetchNewReleaseData();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, [likePressed, likeSongPressed]);


  useEffect(() => {
    const fetchTopTracksData = async () => {
      const topTracks = await fetchArtistTopTracks(searchInput.id);
      setSongs(topTracks);
    };

    const fetchTracksData = async () => {
      const tracksData = await fetchSearchResults(searchInput.name, "track");
      setSongs(tracksData);
    };

    const fetchAlbumsData = async () => {
      const albumsData = await fetchSearchResults(searchInput.name, "album");
      setAlbums(albumsData);
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
      fetchAlbumsData();
    }
  }, [searchInput]);

  function likeSong(playlistName, id) {
    const fetchPlaylistsDislike = async () => {
      await dislikeSongPut(playlistName, id);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
    };
    const fetchPlaylists = async () => {
      await likeSongPost(playlistName, id);
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };

    const playlist = playlists.find(({name}) => name === playlistName);
    if (playlist.songs.includes(id)) {
      fetchPlaylistsDislike();
    }
    else {
      fetchPlaylists();
    }
    setLikePressed(!likePressed);
  }
  return (
    <section className="main main_closed">
      <h1 className="page-heading">Discover</h1>
      <SearchBar
        placeholder="Enter a song/artist"
        searchInput={searchInput}
        setSearchInput={updateSearchInput}
      />

      <div className="discover-body">

      {songs.length === 0 ? (
        <>
        {newReleases.length !== 0 && (
          <div className="page-subSection">
            <h3 className="artist-heading" id="AlbumHeading">
            New Releases
            </h3>
            <AlbumCards albumsData={newReleases} />
          </div>
        )}

        </>
      ) :

        <>
        {songs.length !== 0 && (
          <div className="page-subSection">
            <h3 id="SongHeading">Songs</h3>

            <SongCards songs={songs} playlists={playlists} onLikePressed={likeSong}/>
          </div>
        )}

        {albums.length !== 0 && (
          <div className="page-subSection">
            <h3 className="artist-heading" id="AlbumHeading">
              Albums
            </h3>
            <AlbumCards albumsData={albums} />
          </div>
        )}

        {artists.length !== 0 && (
          <div className="page-subSection">
            <h3 id="ArtistHeading">Artists</h3>
            <ArtistCards artists={artists} />
          </div>
        )}
      </>


        }


      </div>
    </section>
  );
};

export default Discover;
