import './master.css';
import { Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

const MasterHeader = () => {
	return (
		<header>
			<Box className="css-signup-root" sx={{ flexGrow: 1 }}>
				<AppBar position="static" enableColorOnDark>
					<Toolbar>
						<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>Mezzo<img src={'./../../public/logo512.png'} alt="" /></Typography>      
						<Link to="/_/signup">Sign Up </Link>
						<Link to="/_/login"><Button color="inherit">Login</Button></Link>
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




