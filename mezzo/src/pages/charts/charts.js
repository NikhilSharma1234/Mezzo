import '../../assets/global.scoped.css';
import './charts.css';
import DOMPurify from 'dompurify'
import React, {useState, useEffect} from 'react';
import { fetchTop100 } from "../../utils/fetchTop100.js";

const Charts = () => {  
  const [songs, setSongs] = useState([]);

  const fetchTop = async () => {
      const top100 = await fetchTop100();
      setSongs(top100);
  };

  const play = function(id) {
    let audio = document.getElementById(id);
    console.log(audio);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  document.querySelectorAll("td").forEach(function (id) {
    id.onclick = play(id);
  });
  
  useEffect(() => {
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

  function createTable() {
    function millisecToMin(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    let table = "<table border=1>";
    table += `<tr>
                <th>Position</th>
                <th>Title</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Length</th>
                <th>Date Added</th>
              </tr>`;
    let tr = "";
    for(let i = 0; i < parsedTop100.length; i++) {
      let time = millisecToMin(parsedTop100[i].track.duration_ms)
      tr += "<tr>";
      tr += `<td><audio id="previewURL${i+1}"><source src="${parsedTop100[i].track.preview_url}" type="audio/mpeg"></audio>
        <button onclick="play();">PLAY</button>
      ${i + 1}</td>`;
      tr += `<td><img src="${parsedTop100[i].track.album.images[2].url}"/>${parsedTop100[i].track.name}</td>`;
      tr += `<td>${parsedTop100[i].track.album.name}</td>`;
      tr += `<td>${parsedTop100[i].track.artists[0].name}</td>`;
      tr += `<td>${time}</td>`;
      tr += `<td>${parsedTop100[i].track.album.release_date}</td>`;
      tr += "</tr>"
    }
    table += tr + "</table>";
    return table;
  }

  const Table_html = createTable();

  return (
    <section className="main_closed main">
        {<div className="charts_main" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Table_html) }} />}
    </section>
  );
};

export default Charts;