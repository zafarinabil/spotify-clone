import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { IconButton, Stack, Typography, Slider, Box } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { useEffect, useState } from 'react';

const PlayerControls = ({ player, is_paused, duration, progress }) => {
	const skipStyle = { width: 28, height: 28 };
	const [currentProgress, setCurrentProgress] = useState(progress);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!is_paused && player) {
				setCurrentProgress((c) => c + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [is_paused, player]);

	useEffect(() => {
		setCurrentProgress(progress);
	}, [progress]);

	if (!player) return <Box>Transfer playback</Box>;

	return (
		<Stack direction="column" justify="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '100%' }}>
				<IconButton
					onClick={() => {
						setCurrentProgress(0);
						player.previousTrack();
					}}
					size="small"
					sx={{ color: 'text.primary' }}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				<IconButton
					onClick={() => {
						player.togglePlay();
					}}
					size="small"
					sx={{ color: 'text.primary' }}
				>
					{is_paused ? (
						<PlayArrow sx={{ width: 38, height: 38 }} />
					) : (
						<Pause sx={{ width: 38, height: 38 }} />
					)}
				</IconButton>
				<IconButton
					onClick={() => {
						player.nextTrack();
					}}
					size="small"
					sx={{ color: 'text.primary' }}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={3} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '75%' }}>
				<Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(currentProgress)}
				</Typography>
				<Slider
					max={duration}
					value={currentProgress}
					onChange={(_, value) => {
						setCurrentProgress(value);
					}}
					onChangeCommitted={(e, value) => {
						player.seek(value * 1000);
					}}
					min={0}
					size="medium"
					sx={{ color: 'text.primary'}}
				/>
				<Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(duration)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayerControls;