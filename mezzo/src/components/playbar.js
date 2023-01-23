import './../App.css';
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { ImVolumeMedium, ImVolumeLow} from 'react-icons/im';

const PlayBar = () => {
    const [value, setValue] = React.useState(0);

    return (
        <section className="main_closed main">
        <Box className="playbarbox" sx={{ pb: 7 }}>
            <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,}} elevation={10}>
                <Divider className='divider'/>
                <BottomNavigation className="playbar" showLabels value={value}
                    onChange={(event, newValue) => {setValue(newValue);}}>
                    <BottomNavigationAction icon={<AiOutlineLeft />} />
                    <BottomNavigationAction icon={<BsFillPlayFill />} />
                    <BottomNavigationAction label="Song Title Text Here" />
                    <BottomNavigationAction icon={<BsPauseFill />} />
                    <BottomNavigationAction icon={<AiOutlineRight />} />
                    <Box sx={{ width: 200, pt: 2 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <ImVolumeLow />
                            <Slider aria-label="Volume" value={10}/>
                            <ImVolumeMedium />
                        </Stack>
                    </Box>
                </BottomNavigation>
            </Paper>
        </Box>
        </section>
  );
};

export default PlayBar;