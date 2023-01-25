import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NavbarPopup from "./navbar_popup";

import "./navbar.css";
import '../../assets/global.css';

const Navbar = () => {
  let menu = true;
  function ChangeSelector (section, val) {
    if (val === 0) {
      section.classList.remove("main_open");
      section.classList.add("main_closed");
    } else {
      section.classList.add("main_open");
      section.classList.remove("main_closed");
    } 
  }

  function ChangeStatus () {
    let sections = null;
    sections = document.querySelectorAll("section");
    if (menu === false) {
      menu = true;
      document.querySelector("nav").classList.remove("sidenav_closed");
      document.querySelector("nav").classList.add("sidenav_open");
      sections = document.querySelectorAll("section");
      sections.forEach(
        function(section) {
          ChangeSelector(section, 0);
        }
      );
      return <FaChevronLeft />;
    } else {
      menu = false;
      document.querySelector("nav").classList.remove("sidenav_open");
      document.querySelector("nav").classList.add("sidenav_closed");
      sections = document.querySelectorAll("section");
      sections.forEach(
        function(section) {
          ChangeSelector(section, 1);
        }
      );
      return <FaChevronRight />;
    }
  }
  return (
    <>        
      <nav className="sidenav sidenav_open">
        <ul className="sidenav_headers">
          <button className="closebtn" onClick={ChangeStatus}></button>
          <li>
            <Link to="/_/home">Home</Link>
          </li>
          <li>
            <Link to="/_/discover">Discover</Link>
          </li>
          <li>
            <Link to="/_/charts">Charts</Link>
          </li>
          <li>
            <Link to="/_/library">Library</Link>
          </li>
          <li>
            <Link to="/_/profile">Profile</Link>
          </li>
        </ul>

        <div className="sidenav_options">
            <NavbarPopup />
        </div>
      </nav>
    </>
  );
};

export default Navbar;