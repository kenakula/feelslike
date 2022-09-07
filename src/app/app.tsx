import React from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './routes';
import { Box } from '@mui/material';
import { ThemeStoreProvider } from './utils';

export const App = (): JSX.Element => {
  useVH();

  return (
    <ThemeStoreProvider>
      <Box className="page">
        <RouterComponent />
      </Box>
    </ThemeStoreProvider>
  );
};
