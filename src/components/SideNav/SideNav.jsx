import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import NavItem from '../NavItem/NavItem';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

const SideNav = ({ spotifyApi, token }) => {
	const [albumList, setAlbumList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;
			const data = await spotifyApi.getUserPlaylists();
			setLoading(false);
			setAlbumList(data.body.items);
		}
		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylist = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, id) => {
				return <NavPlaylist key={id} loading={loading} />;
			});
		}
		return albumList.map((playlist, id) => {
			return <NavPlaylist key={id} id={playlist.id} loading={loading} name={playlist.name}         images={playlist.images} // Ensure that you pass the images prop here
			spotifyApi={spotifyApi} />;
		});
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				width: 330,
				height: '100%',
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img src="/Spotify_Logo.png" width={'75%'} alt="Spotify" />
			</Box>
			<NavItem name="Home" Icon={HomeOutlinedIcon} target="/" active />
			<NavItem name="Your Library" Icon={SortOutlinedIcon} target="/library1" active />

			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylist()}</Box>
		</Box>
	);
};

export default SideNav;