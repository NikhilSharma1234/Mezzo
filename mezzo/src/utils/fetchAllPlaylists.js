export async function fetchAllPlaylists() {
  try {
    const response = await fetch("http://localhost:4000/api/playlist/all?username=NikhilSharma", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`GET user failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}