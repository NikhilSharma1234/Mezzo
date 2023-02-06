// import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
import './searchbar.css';
import {AiOutlineSearch} from 'react-icons/ai';


function SearchBar({placeholder}) {
    const [filteredData, setFilteredData] = useState([])
    const handleFilter = async (event) => {
        const searchWord = event.target.value
        const datum ={param1: searchWord};
        if (searchWord ===""){
          setFilteredData([])
        } else {
          const response = await fetch("http://localhost:4000/_/api/getSearchResults", {method: 'POST', headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datum)
        });
          console.log(response);
          const data = await response.json();
          console.log(data);
          setFilteredData(data);
          console.log("data");
          console.log(data);
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
          {filteredData?.slice(0, 15).map((value, key) => {
            return <a className="dataItem" href="https://www.google.com/" target="google.com">
                <p>{value.name}</p>

                {value.type === "track" ?
                    <p>- song</p> :
                    <p>- artist</p>
                }
            </a>
          })}
        </div>
        )}
      </div>
    )
  }
  
  export default SearchBar;


  // function SearchBar({placeholder, data}) {
  //   const [filteredData, setFilteredData] = useState([])
  //   const handleFilter = (event) => {
  //     const searchWord = event.target.value
  //     // const newFilter = data.filter((value) => {
  //     //   return value.song.toLowerCase().includes(searchWord.toLowerCase())
  //     // });
  //     if (searchWord ===""){
  //       setFilteredData([])
  //     } else {
  //       setFilteredData(data.tracks.items);
  //     } 
  //   }