import React from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './routes';
import { Box } from '@mui/material';
import { ThemeStoreProvider } from './utils';
import { initializeApp } from 'firebase/app';

export const App = (): JSX.Element => {
  useVH();

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_DOMAIN,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  return (
    <ThemeStoreProvider>
      <Box className="page">
        <RouterComponent />
      </Box>
    </ThemeStoreProvider>
  );
};
