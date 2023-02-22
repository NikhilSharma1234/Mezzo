import "./artist.scoped.js";
import React, { useState, useEffect} from "react";
import { fetchArtistTopTracks } from "../../utils/fetchArtistTopTracks.js";
import { fetchRelatedArtists } from "../../utils/fetchRelatedArtists.js";
import { fetchArtistAlbums } from "../../utils/fetchArtistAlbums.js";
import { fetchArtist} from "../../utils/fetchArtist.js";
import ArtistCards from "../../components/cards/artist-card.js";
import { useParams } from 'react-router-dom';

const Artist = () => {
    const { artistID } = useParams();

    const [artist, setArtist] = useState([]);
    const [popularSongs, setPopularSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);


  useEffect(() => { 
    console.log("hello")

    const fetchArtistData = async () => {
        const artistData = await fetchArtist(artistID);
        console.log("artistInfo",artistData)
        setArtist(artistData);
      };
    // const fetchTopTracksData = async () => {
    //     const topTracks = await fetchArtistTopTracks(artistID);
    //     setPopularSongs(topTracks);
    //   };
    
    //   const fetchAlbumData = async () => {
    //     const artistAlbums = await fetchArtistAlbums(artistID);
    //     setAlbums(artistAlbums);
    //   };
    
    //   const fetchRelatedArtists = async () => {
    //     const allRelatedArtists = await fetchRelatedArtists(artistID);
    //     console.log("related",allRelatedArtists)
    //     setRelatedArtists(allRelatedArtists);
    //   };
      fetchArtistData();
    //   fetchTopTracksData();
    //   fetchAlbumData();
    //fetchRelatedArtists();

  }, [artistID]);


  return (
    <section className="main_closed main">
      <div className="artist-header" />

      {/* <div className="Top Tracks">
        <h3 id="SongHeading">Popular</h3>
        {popularSongs.length !== 0 && <SongCards songs={popularSongs} />}
      </div> */}

      {/* <div className="Albums">
        {albums.length !== 0 && <AlbumCards albums={albums} />}
      </div> */}

      {/* <div className="related-artists">
        <h3 id="ArtistHeading">Related Artists</h3>
        {relatedArtists.length !== 0 && (
          <ArtistCards artists={relatedArtists} />
        )}
      </div> */}
    </section>
  );
};

export default Artist;
