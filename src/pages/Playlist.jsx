import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import SongTable from '../components/SongTable/SongTable';
import { getAverageColor } from '../utils/colorUtils'; 

const Playlist = ({ spotifyApi, token }) => {
  const [playlistInfo, setPlaylistInfo] = useState();
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState({ isLoading: false, isError: null });
  const { id } = useParams();

  // Define the formatSongData function
  const formatSongData = (songs) => {
    return songs.map((song, i) => {
      const { track } = song;
      track.contextUri = `spotify:playlist:${id}`;
      track.position = i;
      return track;
    });
  };

  useEffect(() => {
    const getData = async () => {
      setStatus((prev) => ({ ...prev, isLoading: true }));
      try {
        const playlistDetail = await spotifyApi.getPlaylist(id);
        setPlaylistInfo({
          image: playlistDetail.body.images[0].url,
          name: playlistDetail.body.name
        });

        const { tracks } = playlistDetail.body;
        const formattedSongs = formatSongData(tracks.items);
        setSongs(formattedSongs);
      } catch (error) {
        setStatus((prev) => ({ ...prev, isError: error }));
      }
    };

    getData().finally(() => {
      setStatus((prev) => ({ ...prev, isLoading: false }));
    });
  }, [id, spotifyApi]);

  useEffect(() => {
    if (playlistInfo && playlistInfo.image) {
      const fetchColor = async () => {
        try {
          const color = await getAverageColor(playlistInfo.image); // Assuming getAverageColor returns a promise resolving to a color
          // Set the background gradient based on the dominant color
          document.getElementById('Playlist__page').style.background = `linear-gradient(180deg, ${color} 0%, rgba(0,0,0,0.6) 60%)`;
        } catch (error) {
          console.error('Error fetching playlist image color:', error);
        }
      };

      fetchColor();
    }
  }, [playlistInfo]);

  return (
    <Box id="Playlist__page" sx={{ bgcolor: 'background.paper', flex: 1, overflowY: 'auto' }}>
      <Box
        p={{ xs: 3, md: 4 }}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
          gap: 3,
          boxSizing: 'border-box',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Avatar
          src={playlistInfo?.image}
          variant="square"
          alt="Playlist Image"
          sx={{
            boxShadow: 15,
            width: { sx: '100%', md: 235 },
            height: { sx: '100%', md: 235 }
          }}
        />
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
          <Typography
            sx={{
              fontSize: { xs: 42, md: 72 },
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            {playlistInfo?.name}
          </Typography>
        </Box>
      </Box>
      <SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} />
    </Box>
  );
};

export default Playlist;
