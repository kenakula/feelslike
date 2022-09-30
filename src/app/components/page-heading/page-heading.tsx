import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export const PageHeading = ({ children, title }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 5,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          background: theme.palette.primary.main,
          padding: '5px 40px 5px 16px',
          borderRadius: '0 8px 8px 0',
          marginLeft: '-16px',
          color: theme.palette.background.default,
        }}
      >
        {title}
      </Typography>
      {children ?? null}
    </Box>
  );
};
