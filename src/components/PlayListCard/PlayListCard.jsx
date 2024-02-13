import * as React from 'react';
import { Grid, ListItemButton, ListItemAvatar, Avatar, ListItemText, Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PlayListCard = ({ name, images, id, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Grid item>
                <Skeleton variant="rectangular" sx={{ width: '100%', paddingBottom: '100%' }} />
                <Skeleton variant="text" width={150} height={20} />
            </Grid>
        );
    }

    return (
        <Grid item sx={{
            borderRadius: '10px',
            display: 'flex',
            transition: 'all 0.1s',
            ':hover': {
                backgroundColor: '#343434'
            }
        }}>
            <ListItemButton
                onClick={() => navigate(`/playlist/${id}`)}
                sx={{
                    borderRadius: '10px',
                    width: 250,
                    height: 290,
                    padding: '20px',
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    position: 'relative',
                    transition: 'all 0.3s',
                    ':hover .play-button': {
                        opacity: 1,
                        bottom: '80px',
                        right: '30px'
                    }
                }}
            >
                <ListItemAvatar className="group">
                    <Avatar
                        src={images?.[0]?.url}
                        variant="rounded"
                        sx={{
                            margin: '0 auto 16px',
                            width: '200px',
                            height: '200px'
                        }}
                        className="card-image"
                    />
                    <PlayArrowIcon
                        className="play-button"
                        sx={{
                            backgroundColor: '#1ed760',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 0,
                            position: 'absolute',
                            transition: 'all 0.3s',
                            opacity: 0,
                            bottom: '110px',
                            right: '30px',
                            ':hover': {
                                transform: 'scale(1.1)',
                            }
                        }}
                    />
                </ListItemAvatar>
                <ListItemText primary={name} sx={{ color: 'text.primary', marginTop: '0' }} />
            </ListItemButton>
        </Grid>
    );
};

export default PlayListCard;
