export async function dislikeSongPut(playlist, id) {
  try {
    const response = await fetch("http://localhost:4000/api/playlist/remove", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: 'NikhilSharma',
        song_id: id,
        playlist_name: playlist
      })
    });
    if (!response.ok) {
      throw new Error(`dislikeSongPut failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}