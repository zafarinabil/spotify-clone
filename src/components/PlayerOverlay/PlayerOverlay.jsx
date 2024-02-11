import React from 'react';
import { Box, Typography, Grid, IconButton, Container } from '@mui/material';
import PlayerControls from '../PlayerControls/PlayerControls';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getAverageColor, darkShades } from '../../utils/colorUtils'; 

const PlayerOverlay = ({ progress, is_paused, duration, player, playerOverlayIsOpen, closeOverlay, current_track }) => {
    const [backgroundColor, setBackgroundColor] = React.useState(''); 

    React.useEffect(() => {
        if (current_track?.album.images[0]?.url) {
            getAverageColor(current_track.album.images[0].url)
                .then(avgColor => {
                    setBackgroundColor(avgColor);
                })
                .catch(error => {
                    console.error('Error getting average color:', error);
                    setBackgroundColor(darkShades.gray);
                });
        }
    }, [current_track]);

    return (
        <Box
            id="PlayerOverlay"
            sx={{
                width: '100%',
                height: 'calc(100vh - 75px)',
                bgcolor: '#121212',
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                top: 0,
                left: 0,
                transition: 'all 0.3s',
                transform: playerOverlayIsOpen ? 'translateY(0)' : 'translateY(100vh)'
            }}
        >
            <Container
                sx={{
                    height: '100%',
					background: `linear-gradient(180deg, ${backgroundColor || darkShades.gray} 0%, rgba(18,18,18,0.6) 100%)`
                }}
            >

				<Grid container direction={'column'} justifyContent="space-between" sx={{ height: '100%' }}>
					<Grid
						item
						xs={1}
						sx={{
							display: 'flex',
							alignItems: 'center',
							position: 'relative'
						}}
					>
						<IconButton
							onClick={() => closeOverlay()}
							sx={{
								paddingLeft: '0px'
							}}
						>
							<KeyboardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
						</IconButton>
					</Grid>
					<Grid
						item
						xs={5}
						sx={{
							backgroundImage: `url("${current_track?.album.images[0].url}")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover'
						}}
					></Grid>
					<Grid item xs={1}>
						<Typography variant="body1" sx={{ color: 'text.primary', fontSize: '28px' }}>
							{current_track?.name}
						</Typography>
						<Typography variant="body1" sx={{ color: 'text.primary', fontSize: '18px' }}>
							{current_track?.artists[0].name}
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<PlayerControls progress={progress} is_paused={is_paused} duration={duration} player={player} />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default PlayerOverlay;