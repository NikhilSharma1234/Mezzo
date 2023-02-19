export async function fetchAllPlaylists() {
  try {
    const userID = JSON.parse(localStorage.getItem('username'));
    const response = await fetch("http://localhost:4000/api/playlist/all?username=" + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`GET user failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}