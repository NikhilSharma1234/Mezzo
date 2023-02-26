export async function fetchArtistAlbums(id, groups) {
    const datum = { artistID: id, artistGroups: groups };
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "_/getArtistAlbums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datum),
      });
      if (!response.ok) {
        throw new Error(`fetchArtistTopTracks failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }