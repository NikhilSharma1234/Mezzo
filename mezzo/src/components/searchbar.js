import { Link } from "react-router-dom";
import './../App.css';

const Searchbar = () => {
  return (
    <>        
      <section className="searchbar main_closed main">
        <div> 
          <input type="text" placeholder="Search"></input>
        </div>
      </section>
    </>
  );
};

export default Searchbar;