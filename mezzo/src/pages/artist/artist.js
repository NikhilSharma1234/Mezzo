import "./artist.scoped.css";
import React, { useState, useEffect } from "react";
import SongCards from "../../components/cards/song-card.js";
import AlbumCards from "../../components/cards/album-card.js";
import { fetchArtistTopTracks } from "../../utils/fetchArtistTopTracks.js";
import { fetchRelatedArtists } from "../../utils/fetchRelatedArtists.js";
import { fetchArtistAlbums } from "../../utils/fetchArtistAlbums.js";
import { fetchArtist } from "../../utils/fetchArtist.js";
import ArtistCards from "../../components/cards/artist-card.js";
import { useParams } from "react-router-dom";

const Artist = () => {
  const { artistID } = useParams();
  const [artist, setArtist] = useState([]);
  const [popularSongs, setPopularSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [appearsOnAlbums, setAppearsOnAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      const artistData = await fetchArtist(artistID);
      setArtist(artistData);
    };
    const fetchTopTracksData = async () => {
      const topTracks = await fetchArtistTopTracks(artistID);
      setPopularSongs(topTracks);
    };

    const fetchAlbumData = async () => {
      const artistAlbums = await fetchArtistAlbums(artistID, "album");
      setAlbums(artistAlbums);
    };

    const fetchAppearsOnData = async () => {
      const allAppearsOnAlbums = await fetchArtistAlbums(
        artistID,
        "appears_on"
      );
      setAppearsOnAlbums(allAppearsOnAlbums);
    };

    const fetchAllRelatedArtists = async () => {
      const allRelatedArtists = await fetchRelatedArtists(artistID);
      setRelatedArtists(allRelatedArtists);
    };
    fetchArtistData();
    fetchTopTracksData();
    fetchAlbumData();
    fetchAppearsOnData();
    fetchAllRelatedArtists();
  }, [artistID]);

  if (artist.length === 0) {
    return <p>loading</p>;
  }

  return (
    <section className="main_closed main">
      <div className="artist-header">
        <div className="artist-header-body">
          <h1>{artist.name}</h1>
          {artist.genres.length !== 0 && (
            <p>Genres: {artist.genres.join(" , ")}</p>
          )}
          <p>{artist.followers.total} Followers</p>
        </div>
        <img src={artist.images[0].url} alt="artistImage" />
      </div>


      <section className="artist-body">
      {popularSongs.length !== 0 && (
        <div className="artist-subSection">
          <h3 className="artist-heading" id="SongHeading">
            Popular
          </h3>
          <SongCards songs={popularSongs} />
        </div>
      )}

      {albums.length !== 0 && (
        <div className="artist-subSection">
          <h3 className="artist-heading" id="AlbumHeading">
            Albums
          </h3>
          <AlbumCards albumsData={albums} />
        </div>
      )}

      {appearsOnAlbums.length !== 0 && (
        <div className="artist-subSection">
          <h3 className="artist-heading" id="AlbumHeading">
            Appears On
          </h3>

          <AlbumCards albumsData={appearsOnAlbums} />
        </div>
      )}

      {relatedArtists.length !== 0 && (
        <div className="artist-subSection">
          <h3 className="artist-heading" id="ArtistHeading">
            Related Artists
          </h3>

          <ArtistCards artists={relatedArtists} />
        </div>
      )}
      </section>
    </section>
  );
};

export default Artist;
