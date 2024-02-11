import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavPlaylist.css';

const NavPlaylist = ({ name, id, images, loading, spotifyApi }) => {
  const [playlistInfo, setPlaylistInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDetail = await spotifyApi.getPlaylist(id); 
        setPlaylistInfo({
          image: playlistDetail.body.images[0].url,
        });
      } catch (error) {
        console.error('Error fetching playlist image:', error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [id, loading]);

  return (
    <NavLink className="playlist__navlink" to={loading ? '' : `/playlist/${id}`} style={{ textDecoration: 'none' }}>
      <Box
        px={3}
        py={1}
        sx={{
          color: 'text.secondary',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          '&:hover': { color: 'text.primary' }
        }}
      >
        {loading ? (
          <Skeleton variant={'circular'} width={32} height={32} />
        ) : (
          <>
            <Avatar variant="rounded" alt={name} src={images?.[0]?.url || ''} style={{ marginRight: 8 }} />

            {name}
          </>
        )}
      </Box>
    </NavLink>
  );
};

export default NavPlaylist;
