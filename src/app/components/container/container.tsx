import { Box, SxProps, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | null;
  sx?: SxProps;
}

export const Container = ({ children, sx }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 2,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: { px: 4 },
        [theme.breakpoints.up('lg')]: { px: 6 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
