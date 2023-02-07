import './assets/global.scoped.css';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Navbar from "./components/navbar/navbar";
import Discover from "./pages/discover/discover";
import Charts from "./pages/charts/charts";
import Library from "./pages/library/library";
import Profile from "./pages/profile/profile";
import PlayBar from "./components/playbar/playbar";
import Master from "./pages/master/master";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import React from 'react';
import useLocalStorage from 'use-local-storage';
/*import Navbar, Home, Discover, Charts, Library, Profile, Searchbar from "./components"*/

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/_" element={<Layout />}>
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
        <section className="main main_closed">
          <button className = "theme_btn" onClick={switchTheme}>
            Enter {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </section>
        <Navbar />
        <Outlet />        
        <PlayBar /> 
      </div>
    );
  }
}