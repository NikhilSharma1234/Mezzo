// import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
import './searchbar.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {fetchSearchResults} from "../../utils/fetchSearchResults";


function SearchBar({placeholder, searchInput, setSearchInput}) {
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const artistResults = await fetchSearchResults(searchWord, 'artist');
      const songResults = await fetchSearchResults(searchWord, 'track');
      const results = [...artistResults, ...songResults];
      const newFilter = results.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase())
      });
      setFilteredData(newFilter);
    };

    if (searchWord) {
      fetchData();
    }
  }, [searchWord]);

  const handleKeyDown = (event) => {
    // console.log("Search word")
    // console.log(searchWord);
    if (event.key === 'Enter') {
      setFilteredData([]);
      setSearchInput({name: searchWord})
      setSearchWord(event.target.value);
    }
  };

  const handleSearchInput = (inputVal) => {
    setFilteredData([]);
    setSearchInput({name: inputVal.name, type: inputVal.type, id: inputVal.id});
    setSearchWord(inputVal.name);
  };
    return(
      <div className="search">
        <div className="searchInputs">
        <div className="searchIcon">
            <AiOutlineSearch/>
          </div>
          <input type="text" value={searchWord} placeholder={placeholder} onChange={(event) => setSearchWord(event.target.value)} onKeyDown={handleKeyDown}/>
          
        </div>
  
        {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData?.slice(0,5).map((value, key) => {
            return <a className="dataItem" onClick={() => handleSearchInput(value)}>
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
