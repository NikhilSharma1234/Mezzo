import './../App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from "react-router-dom";

function NavbarPopup() {
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
            <Link to = "/"><MenuItem onClick={popupState.close}>Logout</MenuItem></Link>      {/* Obviously this is temporary, this will move to a post call, etc, once backend is handeled*/}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}


export default NavbarPopup;