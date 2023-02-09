import '../../assets/global.scoped.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from "react-router-dom";
import './navbar_popup.css';

function NavbarPopup() {
  function handleLogout (){
    fetch('http://localhost:4000/api/user/logout', {
      method: 'POST' 
    })
  }

  return (
    <PopupState variant="popover" className="options_popup">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            ...
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>View</MenuItem>
            <MenuItem onClick={popupState.close}>Friends</MenuItem>
            <MenuItem onClick={popupState.close}>Playback</MenuItem>
            <MenuItem onClick={popupState.close}>Help</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}  
    </PopupState>
  );
}


export default NavbarPopup;