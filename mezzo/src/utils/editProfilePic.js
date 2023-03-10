
export async function editProfilePic(id) {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "api/user/editProfileImg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem('username')),
          photo_id: id
        })
      });
      if (!response.ok) {
        throw new Error(`editProfilePic failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }