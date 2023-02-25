export async function fetchAlbum(id) {
    console.log("fetchAlbum: ", id)
    const datum = { albumID: id};
    try {
      const response = await fetch("http://localhost:4000/_/getAlbum", {
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