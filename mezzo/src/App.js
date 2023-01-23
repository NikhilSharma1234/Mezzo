import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from "./components/home";
import Discover from "./components/discover";
import Charts from "./components/charts";
import Library from "./components/library";
import Profile from "./components/profile";
import PlayBar from "./components/playbar"
import Searchbar from "./components/profile"
/*import Navbar, Home, Discover, Charts, Library, Profile, Searchbar from "./components"*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  function Layout() {
    return (
      <>
        <Navbar />
        
        <Outlet /> 
        {/*Footer? Here...*/}       

        <PlayBar /> 
      </>
    );
  }
}