import React, { useState, useEffect } from "react";
import "./profile.scoped.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { AiFillDelete } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { fetchUserProfile } from "../../utils/fetchUserProfile.js";
import { editProfilePic } from "../../utils/editProfilePic.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Profile = () => {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const [profile, setProfile] = useState([]);
  const [imageIcon, setImage] = useState(false);

  const username = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchUserProfile();
      setProfile(profile);
    };

    fetchProfile();
  }, [imageIcon]);

  const handleMouseOver = () => {
    setImage(true);
  };

  const handleMouseOut = () => {
    setImage(false);
  };

  const handleAvatarClick = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let file = input.files[0];
      console.log(file);
      // TODO: save image somewhere

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        await editProfilePic(base64data);
        setImage(profile.profilePicture);
      };
    };
    input.click();
  };

  return (
    <section className="main_closed main">
      <div className="profile-container">
        <div className="profile-header">
          <IconButton onClick={handleAvatarClick}>
            
            <Avatar
              id="profilePicture"
              sx={{ width: 250, height: 250 }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {imageIcon ? (
                <RiImageAddFill id="icon" value={{ color: "white" }} />
              ) : (
                <img src={profile.profilePicture} alt="Profile Picture" />
              )}
            </Avatar>
          </IconButton>
          <div>
            <div className="profile-header-body">
              <p>Profile</p>
              <h1>{username}</h1>
              <p># Public Playlists / # Followers / # Following</p>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-body-left">
            <div className="public-playlists">
              <h3>Account Overview</h3>
              <p>Username: {username}</p>
              <p>Email: {profile.email}</p>
            </div>
            <hr />
            <div className="public-playlists">
              <h3>Public Playlists</h3>
            </div>
          </div>
          <Grid item xs={3}>
            <Item
              sx={{
                backgroundColor: "var(--profile-panel-bg)",
                color: "var(--profile-panel-color)",
              }}
            >
              <h3>Friends</h3>
              <List dense={dense} sx={{ height: "700px", overflowY: "scroll" }}>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <AiFillDelete />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BsPersonFill />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="best friend"
                      secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </Item>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Profile;
