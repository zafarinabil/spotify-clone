import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PlayListCard from '../components/PlayListCard/PlayListCard';

const LibraryDesktop = ({ spotifyApi, token }) => {
    const [albumList, setAlbumList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPlaylists() {
            if (!spotifyApi) return;

            const data = await spotifyApi.getUserPlaylists();

            setLoading(false);
            setAlbumList(data.body.items);
            // console.log(data.body.items);
        }
        getPlaylists();
    }, [spotifyApi, token]);

    const renderPlaylistItems = () => {
        if (loading) {
            return [1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <PlayListCard loading={loading} />
                </Grid>
            ));
        }

        return albumList.map((playlist, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                <PlayListCard {...playlist} loading={loading} />
            </Grid>
        ));
    };

    return (
        <Box
            id="LibraryDesktop"
            px={3}
            sx={{
                display: 'flex',
                bgcolor: 'background.default',
                flex: 1,
                flexDirection: 'column',
                overflowY: 'auto'
            }}
        >
            <Typography py={3} variant="h2" fontWeight="bold" sx={{ color: 'text.primary', fontSize: 30 }}>
                Library
            </Typography>
            <Grid container spacing={2}>
                {renderPlaylistItems()}
            </Grid>
        </Box>
    );
};

export default LibraryDesktop;
