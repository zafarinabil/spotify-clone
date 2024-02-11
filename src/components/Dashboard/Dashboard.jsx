import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SideNav from '../SideNav/SideNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import Playlist from '../../pages/Playlist';
import Player from '../Player/Player';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';
import LibraryDesktop from '../../pages/LibraryDesktop';

const Dashboard = ({ spotifyApi }) => {
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(getAccessTokenFromStorage());

	useEffect(() => {
		const onMount = async () => {
			await spotifyApi.setAccessToken(token);
			setLoading(false);
		};

		if (token) {
			onMount();
		}
	}, [spotifyApi, token]);

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			{loading ? (
				<CircularProgress />
			) : (
				<Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
					<SideNav spotifyApi={spotifyApi} token={token} />
					<Routes>
						<Route path="/playlist/:id" element={<Playlist token={token} spotifyApi={spotifyApi} />} />
						<Route path="/library1" element={<LibraryDesktop spotifyApi={spotifyApi} token={token} />} />
						<Route path="/library" element={<Library spotifyApi={spotifyApi} token={token} />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</Box>
			)}
			{token && !loading && <Player spotifyApi={spotifyApi} />}
			<MobileNav />
		</Box>
	);
};

export default Dashboard;
