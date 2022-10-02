import React, { ElementType } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  children?: JSX.Element | JSX.Element[];
  title: string;
  component?: ElementType<any>;
}

export const PageHeading = ({
  children,
  title,
  component,
}: Props): JSX.Element => {
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
        component={component ?? 'h1'}
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
