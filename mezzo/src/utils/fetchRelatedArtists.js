export async function fetchRelatedArtists(id) {
    const datum = { artistID: id };
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "_/getRelatedArtists", {
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
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }