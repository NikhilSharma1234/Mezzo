import React from "react";
import reactDOM from "react-router-dom";
import "./App.css";

const page_content = (
  <div style="margin-left:25%">
      <p>
        Current Tab: {tab}
      </p>
  </div>  
);

function App(props) {
  const tab = props.curr_tab;
  return (
    <div className="sidebar" style="width:25%">
      <a href="#home" className="">Home</a>
      <a href="#discover" className="">Discover</a>
      <a href="#charts" className="">Charts</a>
      <a href="#library" className="">Library</a>
      <a href="#profile" className="">Profile</a>
    </div>
  );
};

export default App;
