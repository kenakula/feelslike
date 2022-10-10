import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export const PageSkeleton = (): JSX.Element => {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: '47px',
          borderRadius: '0 8px 8px 0',
          mb: 5,
          marginLeft: '-16px',
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: '340px',
          borderRadius: '8px',
          mb: 5,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: '47px',
          borderRadius: '0 8px 8px 0',
          mb: 5,
          marginLeft: '-16px',
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: '150px',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};
