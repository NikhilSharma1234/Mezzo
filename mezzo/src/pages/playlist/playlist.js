import { Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext} from "react";
import { MusicRow } from "../../components/musicTable/musicRow.js";


const Playlist=()=> {
    const location = useLocation();
    // const playlistData = location.state ? location.state.playlistData : {id: "1",title:"playlist title", author: "author", cover: "./testPlaylistCover.jpg"};
    // const fromLibrary = location.state ? location.state.fromLibrary : false;

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