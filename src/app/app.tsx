import React, { useEffect, useState } from 'react';
import useVH from 'react-viewport-height';
import { RouterComponent } from './router';
import { Box } from '@mui/material';
import { ThemeStoreProvider } from './utils';
import { auth, onAuthStateChanged } from './firebase';
import { useAppDispatch } from './store';
import { BootState } from './types';
import { Loader, TechnicalIssues } from './components';
import { setAuthState } from './store/auth-slice';

export const App = (): JSX.Element => {
  const [bootState, setBootState] = useState<BootState>('none');
  const dispatch = useAppDispatch();
  useVH();

  useEffect(() => {
    setBootState('loading');
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      console.log('auth state changed');
      if (userAuth) {
        console.log('userAuth:', userAuth);
        dispatch(setAuthState(userAuth));
      } else {
        console.log('no user auth');
      }
      setBootState('success');
    });

    return () => unsubscribe();
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
