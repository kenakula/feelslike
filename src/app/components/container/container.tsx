import React, { ReactNode } from 'react';
import { Box, SxProps, useTheme } from '@mui/material';

interface Props {
  children: ReactNode;
  sx?: SxProps;
}

export const Container = ({ children, sx }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 2,
        width: '100%',
        maxWidth: '512px',
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
