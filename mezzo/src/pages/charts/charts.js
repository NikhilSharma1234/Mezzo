import React, { useState, useEffect, useContext } from "react";
import "./charts.css";
import { fetchTop100 } from "../../utils/fetchTop100.js";
import { MusicRow } from "../../components/musicTable/musicRow.js";

const Charts = () => {
  const [songs, setSongs] = useState([]);

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
  }, []);

  let parsedTop100 = songs.map(song => {
    let obj = Object.assign({}, song);
    delete obj.added_by;
    delete obj.added_at;
    delete obj.is_local;
    delete obj.primary_color;
    delete obj.video_thumbnail;
    return obj;
  });

  return (
    <section className="main_closed main" id="charts-main">
      <h1>Top 100</h1>
      <table border="1">
        <thead>
          <tr>
            <th className="position-column">#</th>
            <th className="title-column">Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {parsedTop100.map((song, index) => {
            return <MusicRow index={index} songData={song.track} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Charts;
