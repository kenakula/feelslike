import React, { useEffect, useState } from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './routes';
import { Box } from '@mui/material';
import { ThemeStoreProvider } from './utils';
import { auth, onAuthStateChanged } from './firebase';
import { useAppDispatch, useAppSelector } from './store';
import { setUserData } from './store/userSlice';
import { BootState } from './types';

export const App = (): JSX.Element => {
  const [bootState, setBootState] = useState<BootState>('none');
  const dispatch = useAppDispatch();
  useVH();

  useEffect(() => {
    setBootState('loading');
    onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        dispatch(setUserData(userAuth));
        setBootState('success');
      }
    });
  }, []);

  if (bootState === 'none') {
    return <p>no boot state</p>;
  }

  if (bootState === 'error') {
    return <p>Error bitch</p>;
  }

  if (bootState === 'loading') {
    return <p>loading</p>;
  }

  return (
    <ThemeStoreProvider>
      <Box className="page">
        <RouterComponent />
      </Box>
    </ThemeStoreProvider>
  );
};
