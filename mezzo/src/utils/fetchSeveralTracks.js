export async function fetchSeveralTracks(trackIDs) {
    const datum = { IDs: trackIDs };
    try {
      const response = await fetch("http://localhost:4000/_/getSeveralTracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datum),
      });
      if (!response.ok) {
        throw new Error(`fetchSeveralTracks failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }