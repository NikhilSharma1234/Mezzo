export async function dislikeSongPut(playlist, id) {
  try {
    const userID = JSON.parse(localStorage.getItem('username'));
    const response = await fetch(process.env.REACT_APP_API_URL + "api/playlist/remove", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userID,
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