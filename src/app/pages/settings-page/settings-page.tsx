/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  AuthError as AuthErrorComponent,
  Container,
  PageHeading,
} from 'app/components';
import { useRootStore } from 'app/stores';
import { SnackBarStateProps } from 'app/types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { isGoogleAccount } from './assets';
import { EmailForm, PasswordForm } from './components';

export const SettingsPage = observer((): JSX.Element => {
  const [snackbarState, setSnackbarState] = useState<SnackBarStateProps>({
    isOpen: false,
    message: '',
    alert: 'success',
  });
  const {
    authStore: { currentUser, setError, error: authError },
  } = useRootStore();

  const handleSnackbarClose = (): void => {
    setSnackbarState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <Container sx={{ pt: 5 }}>
      {authError && <AuthErrorComponent message={authError} />}
      <PageHeading title="Настройки" />
      {currentUser && !isGoogleAccount(currentUser) && (
        <>
          <EmailForm
            setSnackbarState={setSnackbarState}
            setError={setError}
            currentUser={currentUser}
          />
          <PasswordForm
            setSnackbarState={setSnackbarState}
            setError={setError}
            currentUser={currentUser}
          />
        </>
      )}
      <Snackbar
        open={snackbarState.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarState.alert}>{snackbarState.message}</Alert>
      </Snackbar>
    </Container>
  );
});
