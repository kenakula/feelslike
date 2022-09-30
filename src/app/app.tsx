/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './router';
import { Box } from '@mui/material';
import { useThemeStore } from './utils';
import { auth, onAuthStateChanged } from './firebase';
import { BootState } from './types';
import { Loader, TechnicalIssues } from './components';
import { useRootStore } from './stores';

export const App = (): JSX.Element => {
  const [bootState, setBootState] = useState<BootState>('none');
  const { theme } = useThemeStore();
  const {
    authStore: { setCurrentUser, getUserData },
  } = useRootStore();
  useVH();

  useEffect(() => {
    setBootState('loading');

    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        setCurrentUser(userAuth);
        getUserData(userAuth.uid);
        setBootState('success');
      } else {
        setCurrentUser(null);
        setBootState('success');
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box
      className="page"
      sx={{ backgroundColor: theme ? theme.palette.background : '#FDFFFC' }}
    >
      {renderContent()}
    </Box>
  );
};
