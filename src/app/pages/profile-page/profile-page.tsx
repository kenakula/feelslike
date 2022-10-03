/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/system/Stack';
import { observer } from 'mobx-react-lite';
import { Container, PageHeading } from 'app/components';
import { useRootStore } from 'app/stores';
import { SnackBarStateProps } from 'app/types';
import { UserAvatar } from './components';

const MAX_IMAGE_SIZE = 4e6;

export const ProfilePage = observer((): JSX.Element => {
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

  const handleUploadAvatar = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (!userData) {
      return;
    }

    const selectedFiles = evt.target.files;
    const file =
      selectedFiles && selectedFiles.length ? selectedFiles[0] : null;

    if (!file) {
      return;
    }

    if (file.size >= MAX_IMAGE_SIZE) {
      setSnackbarState(prev => ({
        ...prev,
        isOpen: true,
        alert: 'error',
        message: 'Изображение слишком большого размера',
      }));

      return;
    }

    setImageProcessing(true);

    uploadUserImage(file)
      .then(() => {
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          message: 'Аватар успешно загружен',
          alert: 'success',
        }));
        setImageProcessing(false);
      })
      .catch(() => {
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          alert: 'error',
          message: 'Неизвестная ошибка, попробуйте позже',
        }));
      });
  };

  const handleDeleteAvatar = (): void => {
    setImageProcessing(true);
    deleteUserImage()
      .then(() => {
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          alert: 'error',
          message: 'Аватар удален',
        }));
        setImageProcessing(false);
      })
      .catch(() => {
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          alert: 'error',
          message: 'Неизвестная ошибка, попробуйте позже',
        }));
      });
  };

  const renderContent = (): JSX.Element | null => {
    if (!userData) {
      return null;
    }

    const { profileImage, displayName } = userData;

    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          {imageProcessing ? (
            <Skeleton width={200} height={200} variant="circular" />
          ) : (
            <UserAvatar
              displayName={displayName}
              profileImage={profileImage}
              handleDelete={handleDeleteAvatar}
              handleUpload={handleUploadAvatar}
            />
          )}
        </Box>
        <Stack spacing={2}>
          <Typography textAlign="center" variant="h6" component="h2">
            {displayName}
          </Typography>
        </Stack>
      </>
    );
  };

  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Ваш профиль" />
      {renderContent()}
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
