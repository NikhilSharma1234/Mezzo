export async function fetchNewReleases(limitNum) {
    const datum = {limit: limitNum};
    try {
      const response = await fetch("http://localhost:4000/_/getNewReleases", {
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
      return data.albums.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }