import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  size?: number;
}

export const Loader = ({ size = 40 }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};
