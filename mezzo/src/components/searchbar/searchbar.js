// import { Link } from "react-router-dom";
import {useState} from "react"
import './searchbar.css';
import {AiOutlineSearch} from 'react-icons/ai';


function SearchBar({placeholder, data}) {
  const [filteredData, setFilteredData] = useState([])
  const handleFilter = (event) => {
    const searchWord = event.target.value
    const newFilter = data.filter((value) => {
      return value.song.toLowerCase().includes(searchWord.toLowerCase())
    });
    if (searchWord ===""){
      setFilteredData([])
    } else {
      setFilteredData(newFilter);
    } 
  }
  return(
    <div className="search">
      <div className="searchInputs">
      <div className="searchIcon">
          <AiOutlineSearch/>
        </div>
        <input type="text" placeholder={placeholder} onChange={handleFilter}/>
        
      </div>

      {filteredData.length !== 0 && (
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return <a className="dataItem" href="https://www.google.com/" target="google.com">
              <p>{value.song}</p>
          </a>
        })}
      </div>
      )}
    </div>
  )
}

export default SearchBar;