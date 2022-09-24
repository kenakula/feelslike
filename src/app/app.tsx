import React, { useEffect, useState } from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './routes';
import { Box } from '@mui/material';
import { ThemeStoreProvider } from './utils';
import { auth, onAuthStateChanged } from './firebase';
import { useAppDispatch } from './store';
import { setUserData } from './store/userSlice';
import { BootState } from './types';
import { Loader, TechnicalIssues } from './components';

export const App = (): JSX.Element => {
  const [bootState, setBootState] = useState<BootState>('none');
  const dispatch = useAppDispatch();
  useVH();

  useEffect(() => {
    setBootState('loading');
    onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        dispatch(setUserData(userAuth));
      }
      setBootState('success');
    });
  }, []);

  const renderContent = (): JSX.Element | null => {
    switch (bootState) {
      case 'loading':
        return <Loader size={100} />;
      case 'error':
        return <TechnicalIssues />;
      case 'success':
        return <RouterComponent />;
      default:
        return null;
    }
  };

  return (
    <ThemeStoreProvider>
      <Box className="page">{renderContent()}</Box>
    </ThemeStoreProvider>
  );
};
