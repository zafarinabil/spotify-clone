import React from 'react';
import { Box, Button } from '@mui/material';

const Home = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 5
			}}
		>
			{/* Byt till en bild om dig själv */}
			<img src="/nabil-logo.png" style={{ maxHeight: '100%', maxWidth: '100%' }} alt="nabil-logo" />
			<Button
				size="large"
				variant="contained"
				onClick={() => (window.location.href = 'https://zafarinabil.netlify.app/')}
				sx={{ backgroundColor: 'text.primary', color: 'background.default'}}


			>
				My Portfolio
			</Button>
		</Box>
	);
};

export default Home;