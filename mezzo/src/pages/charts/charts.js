import React, {useState, useEffect} from 'react';
import './charts.css';
import { fetchTop100 } from "../../utils/fetchTop100.js";

const Charts = () => {  
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchTop = async () => {
      const top100 = await fetchTop100();
      setSongs(top100);
    };

    fetchTop();
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

  function playAudio(audioUrl) {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const audioElement = new Audio(audioUrl);
      audioElement.volume = 0.03;
      audioElement.play();
      setAudio(audioElement);
      setIsPlaying(true);
    }
  }

  function millisecToMin(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <section className="main_closed main">
      <table border="1">
        <thead>
          <tr>
            <th>Position</th>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Length</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {parsedTop100.map((song, index) => (
            <tr key={index}>
              <td
                onMouseOver={() => setShowButton(index)}
                onMouseOut={() => setShowButton(-1)}
              >
                {song.track.preview_url ? (
                  showButton === index ? (
                    <button onClick={() => playAudio(song.track.preview_url)}>
                      {isPlaying && audio.src === song.track.preview_url ? 'Pause' : 'Play'}
                    </button>
                  ) : (
                    <p>{index + 1}</p>
                  )
                ) : (
                  <p>{index + 1}</p>
                )}
              </td>
              <td>
                <img src={song.track.album.images[2].url} alt="" />
                {song.track.name}
              </td>
              <td>{song.track.album.name}</td>
              <td>{song.track.artists[0].name}</td>
              <td>{millisecToMin(song.track.duration_ms)}</td>
              <td>{song.track.album.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Charts;