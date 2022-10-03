/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';
import { observer } from 'mobx-react-lite';
import { Container, PageHeading } from 'app/components';
import { useRootStore } from 'app/stores';
import { SnackBarStateProps } from 'app/types';
import { stringToColor } from 'app/utils';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {
  Alert,
  Skeleton,
  Snackbar,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Stack from '@mui/system/Stack';

export const SettingsPage = observer((): JSX.Element => {
  const [imageProcessing, setImageProcessing] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackBarStateProps>({
    isOpen: false,
    message: 'Аватар успешно загружен',
    alert: 'success',
  });
  const {
    authStore: { userData, uploadUserImage, deleteUserImage },
  } = useRootStore();

  const handleSnackbarClose = (): void => {
    setSnackbarState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Настройки" />
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
