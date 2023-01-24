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
import Master from "./components/master"

/*import Navbar, Home, Discover, Charts, Library, Profile, Searchbar from "./components"*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />} />
        <Route path="/_" element={<Layout />}>
          <Route path="/_/home" element={<Home />} />
          <Route path="/_/discover" element={<Discover />} />
          <Route path="/_/charts" element={<Charts />} />
          <Route path="/_/library" element={<Library />} />
          <Route path="/_/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  function Layout() {
    return (
      <>
        <Navbar />
        <Outlet />        
        <PlayBar /> 
      </>
    );
  }
}