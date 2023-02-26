export async function fetchTop100() {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "_/getTop100", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`fetchTop100 failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}