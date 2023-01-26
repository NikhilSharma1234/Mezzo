import './assets/global.scoped.css';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Discover from "./pages/discover/discover";
import Charts from "./pages/charts/charts";
import Library from "./pages/library/library";
import Profile from "./pages/profile/profile";
import PlayBar from "./components/playbar/playbar";
import Searchbar from "./components/searchbar/searchbar.js";
import Master from "./pages/master/master";
import React from 'react';
import useLocalStorage from 'use-local-storage';
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
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    }
    return (
      <div className="app" data-theme={theme}>
      <button onClick={switchTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
        <Navbar />
        <Outlet />        
        <PlayBar /> 
      </div>
    );
  }
}