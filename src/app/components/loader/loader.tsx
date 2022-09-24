import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface Props {
  size?: number;
}

export const Loader = ({ size = 40 }: Props): JSX.Element => {
  return (
    <CircularProgress
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      size={size}
    />
  );
};
