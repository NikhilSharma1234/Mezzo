import React, {useState, useEffect} from 'react';
import "./profile.scoped.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { AiFillDelete } from 'react-icons/ai';
import {BsPersonFill } from 'react-icons/bs';
import { RiImageAddFill } from 'react-icons/ri';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { fetchUserProfile } from "../../utils/fetchUserProfile.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
}));

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}


const Profile = () => {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const [profile, setProfile] = useState([]);
  const [imageIcon, setImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchUserProfile();
      setProfile(profile);
    };

  fetchProfile();
  }, []);

  const handleMouseOver = () => {
    setImage(true)
  };

  const handleMouseOut = () => {
    setImage(false)
  };

  const handleAvatarClick = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
    
      let file =  input.files;
      console.log(file);
      // TODO: save image somewhere
    };
    input.click();
  };
  return (
    <section className="main_closed main" >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', justifyContent: 'center' }}>
              <h1>Profile</h1>
              <Stack sx={{alignItems: 'center'}}>
                <IconButton  onClick={handleAvatarClick}>
                  <Avatar id="profilePicture" sx={{width: 350, height: 350, mt: 2}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {imageIcon ? <RiImageAddFill id="icon" value={{ color: 'white' }}/> : <BsPersonFill id="icon"/> }
                  </Avatar>
                </IconButton>
              </Stack>
              <TextField className="textField" label={profile.email} variant="outlined" sx={{mt: 3, mb: 1}} />
              <TextField className="textField" label={profile.username} variant="outlined" />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <List dense={dense} sx={{ height: '615px', overflowY: 'scroll' }}>
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
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default Profile;