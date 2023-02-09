import './master.scoped.css';
import { Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MasterHeader = () => {
	return (
		<header>
			<Box className="css-signup-root" sx={{ flexGrow: 1 }}>
				<AppBar position="static" enableColorOnDark>
					<Toolbar>
						<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Mezzo<img src={'./../../public/logo512.png'} alt="" /></Typography>      
						<Link to="/signup">Sign Up </Link>
						<Link to="/login"><Button color="inherit">Login</Button></Link>
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
};

const MasterBody = () => {
	return (
		<body>
			<div className="master_panel">{/*MediaControlCard()*/}</div>
		</body>
	);
};

const Master = () => {
	return (
		<div className="master_main">
			<MasterHeader />
			<MasterBody />
		</div>
	);
};

export default Master;




