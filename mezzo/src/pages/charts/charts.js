import React, { useState, useEffect, useContext } from "react";
import "./charts.scoped.css";
import { AudioContext } from "../../context/audioContext.js";
import { fetchTop100 } from "../../utils/fetchTop100.js";
import { fetchAllPlaylists } from "../../utils/fetchAllPlaylists.js";
import { likeSongPost } from "../../utils/likeSongPost.js";
import { dislikeSongPut } from "../../utils/dislikeSongPut.js";
import { MusicRow } from "../../components/musicTable/musicRow.js";

const Charts = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [, , , , , likeSongPressed] = useContext(AudioContext);

  useEffect(() => {
    const fetchTop = async () => {
      const top100 = await fetchTop100();
      setSongs(top100);
    };

    fetchTop();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, [likeSongPressed]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists);
    };
    fetchPlaylists();
  }, []);

  console.log("chart songs: ", songs)
  let parsedTop100 = songs.map(song => {
    let obj = Object.assign({}, song);
    delete obj.added_by;
    delete obj.added_at;
    delete obj.is_local;
    delete obj.primary_color;
    delete obj.video_thumbnail;
    return obj;
  });

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
  }

  function reloadPlaylists() {
    const fetchPlaylists = async () => {
      const allPlaylists = await fetchAllPlaylists();
      setPlaylists(allPlaylists.playlists)
    };
    fetchPlaylists();
  }

  return (
    <section className="main_closed main" id="charts-main">
      <h1 className="page-heading">Top 100</h1>
      <table border="1">
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parsedTop100.map((song, index) => {
            return <MusicRow index={index} songData={song.track} playlists={playlists} onLikePressed={likeSong} reloadPlaylists={reloadPlaylists} key={index}/>;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Charts;
