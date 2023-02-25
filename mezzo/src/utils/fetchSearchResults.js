export async function fetchSearchResults(searchWord, searchType) {
  const datum = { q: searchWord, type: searchType };
  try {
    const response = await fetch("http://localhost:4000/_/getSearchResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datum),
    });
    if (!response.ok) {
      throw new Error(`fetchSearchResults failed with status: ${response.status}`);
    }
    const data = await response.json();

    if(searchType.toLowerCase()==="track"){
      return data.tracks.items;
    } 
    else if(searchType.toLowerCase()==="album"){
      return data.albums.items;
    }
    else{
      return data.artists.items;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}