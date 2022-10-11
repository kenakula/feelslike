import React, { ElementType } from 'react';
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
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 5,
      }}
    >
      <Typography variant="h5" component={component ?? 'h1'}>
        {title}
      </Typography>
      {children ?? null}
    </Box>
  );
};
