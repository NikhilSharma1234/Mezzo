import "./assets/global.scoped.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Discover from "./pages/discover/discover";
import Charts from "./pages/charts/charts";
import Library from "./pages/library/library";
import Profile from "./pages/profile/profile";
import PlayBar from "./components/playbar/playbar";
import Master from "./pages/master/master";
import Login from "./pages/login/login";
import Playlist from "./pages/playlist/playlist";
import Artist from "./pages/artist/artist";
import Signup from "./pages/login/signup";
import ResetPW from "./pages/login/forgot_password";
import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { AudioProvider } from "./context/audioContext.js";

export default function App() {
  const [isAuth, setAuth] = useState(null);

  const handleAuth = (data) => {
    setAuth(data);
    if (localStorage.getItem('username')){
      setAuth(true);
    }
  };
  
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setAuth(true);
    }
  }, []);

  const SendTo404 = () => {
    return (
      <main>
        <div className="err_margin">
          <h1 className="err"> 404</h1>
          <h2 className="err">Request Not Found</h2>
          <h4 className="err">Please <Link to="/login">Login</Link> Or <Link to="/signup">Signup</Link> Now!</h4>
        </div>
      </main>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master onAuth={handleAuth}/>} />
        <Route path="/login" element={<Login onAuth={handleAuth}/>} />
        <Route path="/signup" element={<Signup onAuth={handleAuth}/>} />
        <Route path="/forgotpw" element={<ResetPW />} />
        {isAuth ? (
          <Route path="/_" element={<Layout />}>
            <Route path="/_/discover" element={<Discover />} />
            <Route path="/_/charts" element={<Charts />} />
            <Route path="/_/library" element={<Library />} />
            <Route path="/_/profile" element={<Profile />} />
            <Route path="/_/playlist/:playlistID" element={<Playlist />} />
            <Route path="/_/artist/:artistID" element={<Artist />} />
          </Route>
        ) : null}

        <Route path="*" element={<SendTo404 />} />
      </Routes>
    </BrowserRouter>
  );

  function Layout() {
    const username = JSON.parse(localStorage.getItem("username"));
    const defaultDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const [theme, setTheme] = useLocalStorage(
      "theme",
      defaultDark ? "dark" : "light"
    );

    const switchTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    };
    return (
      <div className="app" data-theme={theme}>
        <AudioProvider>
         
            <p id="user">{username}</p>\
       
          <Navbar switchTheme={switchTheme} />
          <Outlet />
          <PlayBar />
        </AudioProvider>
      </div>
    );
  }
}
