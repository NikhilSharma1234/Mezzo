
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './../App.css';

const Navbar = () => {
  let menu = true;
  function ChangeStatus () {
    if (menu === false) {
      menu = true;
      document.querySelector("nav").classList.remove("sidenav_closed");
      document.querySelector("nav").classList.add("sidenav_open");
      document.querySelector("section").classList.remove("main_open");
      document.querySelector("section").classList.add("main_closed");
      return <FaChevronLeft />;
    } else {
      menu = false;
      document.querySelector("nav").classList.remove("sidenav_open");
      document.querySelector("nav").classList.add("sidenav_closed");
      document.querySelector("section").classList.remove("main_closed");
      document.querySelector("section").classList.add("main_open");
      return <FaChevronRight />;
    }
  }
  return (
    <>        
      <nav className="sidenav sidenav_open">
        <ul className="sidenav_headers">
          <button className="closebtn" onClick={ChangeStatus}></button>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>
            <Link to="/charts">Charts</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;