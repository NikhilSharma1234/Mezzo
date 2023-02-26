import "./album.scoped.css";
import React, { useState, useEffect } from "react";
import { fetchAlbum } from "../../utils/fetchAlbum.js";
import { useParams } from "react-router-dom";
import { AlbumRow } from "../../components/musicTable/albumRow.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";

const Album = () => {
  const { albumID } = useParams();
  const [album, setAlbum] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likePressed, setLikePressed] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, [likePressed]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await fetchAlbum(albumID);
      setAlbum(albumData);
    };
    fetchAlbumData();
  }, [albumID]);


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

  function reloadPlaylists() {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
    };
    fetchPlaylists();
  }
  
  // console.log("album tracks: ", album.tracks.items)
  // let albumTracks = album.tracks.items;
//   let albumTracks = album.tracks.items.map(song => {
//     let obj = Object.assign({}, song);
//     delete obj.added_by;
//     delete obj.added_at;
//     delete obj.is_local;
//     delete obj.primary_color;
//     delete obj.video_thumbnail;
//     return obj;
//   });

  if (album.length === 0) {
    return <p>loading</p>;
  }

  return (
    <section className="main_closed main">
      <div className="album-header">
      <img src={album.images[1].url} alt="albumImage" />
        <div className="album-header-body">
        <p>album</p>
          <h1>{album.name}</h1>
          <p>{album.artists[0].name} · {album.total_tracks} tracks · {album.release_date.slice(0, 4)}</p>
        </div>
      </div>


      {album.tracks.items.length > 0 ?
      <table id="album-table" border="1">
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {album.tracks.items.map((song, index) => {
            return <AlbumRow index={index} songData={song} playlists={playlists} onLikePressed={likeSong} reloadPlaylists={reloadPlaylists} key={index} albumImg={album.images[1].url}/>;
          })}
        </tbody>
      </table>
      
      :
      <p>loading...</p>
}


  
    </section>
  );
};

export default Album;