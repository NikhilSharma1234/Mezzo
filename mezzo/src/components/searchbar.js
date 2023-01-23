import { Link } from "react-router-dom";
import './../App.css';

const Searchbar = () => {

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    //filler code
    // songs.filter((song) => {
    //   return song.name.match(searchInput);
    // });
  }

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