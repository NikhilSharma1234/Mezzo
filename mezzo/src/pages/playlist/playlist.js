import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext} from "react";
import { MusicRow } from "../../components/musicTable/musicRow.js";


const Playlist=()=> {
  const { playlistID } = useParams();
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        const fetchPlaylistSongs = async () => {
          //Code to get playlist songs from the db
        };
    
        fetchPlaylistSongs();
      }, []);

    //Parse songs if needed
    //   let parsedPlaylistSongs = 


  return (
    <>
    {/* {!fromLibrary && (
      <Navigate
        to={{
          pathname: "/_/library",
        }}
        replace={true}
      />
    )} */}



<section className="main_closed main" id="charts-main">
    <h1>Playlist Title</h1>
      {/* <h1>{playlistData.title}</h1> */}

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
          {/* {parsedPlaylistSongs.map((song, index) => {
            return <MusicRow index={index} songData={song.track} />;
          })} */}
        </tbody>
      </table>
    </section>
    </>
  );
}

export default Playlist;