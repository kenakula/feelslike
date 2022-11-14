/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Container, InputComponent } from 'app/components';
import { useRootStore } from 'app/stores';
import { SnackBarStateProps } from 'app/shared/types';
import { UserAvatar } from './components';
import { blue } from '@mui/material/colors';
import { Button, Table, TableCell, TableRow } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from 'firebase/auth';

const MAX_IMAGE_SIZE = 4e6;

interface EmailFormModel {
  email: string;
}
const emailSchema = yup.object({
  email: yup
    .string()
    .email('Почта введена неправильно')
    .required('Это обязательное поле'),
});

export const ProfilePage = observer((): JSX.Element => {
  const [imageProcessing, setImageProcessing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackBarStateProps>({
    isOpen: false,
    message: 'Аватар успешно загружен',
    alert: 'success',
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EmailFormModel>({
    defaultValues: { email: '' },
    resolver: yupResolver(emailSchema),
  });

  const {
    authStore: { userData, uploadUserImage, deleteUserImage, updateUserEmail },
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

  const handleEmailSubmit = ({ email }: EmailFormModel): void => {
    setProcessing(true);
    updateUserEmail(email)
      .then(() => {
        setProcessing(false);
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          alert: 'success',
          message: 'Почта обновлена',
        }));
        reset();
      })
      .catch((err: AuthError) => {
        setProcessing(false);
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          alert: 'error',
          message: err.message,
        }));
      });
  };

  const renderContent = (): JSX.Element | null => {
    if (!userData) {
      return null;
    }

    const { profileImage, email } = userData;

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            mx: -16,
            py: 5,
            background: blue[50],
          }}
        >
          {imageProcessing ? (
            <Skeleton width={200} height={200} variant="circular" />
          ) : (
            <UserAvatar
              email={email}
              profileImage={profileImage}
              handleDelete={handleDeleteAvatar}
              handleUpload={handleUploadAvatar}
            />
          )}
        </Box>
        <Table>
          <tbody>
            <TableRow>
              <TableCell>
                <Typography variant="h6" component="p">
                  Почта
                </Typography>
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          </tbody>
        </Table>
        <Box sx={{ py: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            sx={{ mb: 1 }}
          >
            Сменить почту
          </Typography>
          <Box
            sx={{ display: 'flex' }}
            component="form"
            onSubmit={handleSubmit(handleEmailSubmit)}
          >
            <InputComponent<EmailFormModel>
              formControl={control}
              name="email"
              label="Почта"
              fullwidth
              type="email"
              error={!!errors.email}
              errorMessage="Введите корректно почту."
              styles={{ mr: 1 }}
              small
            />
            <Button
              size="small"
              variant="outlined"
              type="submit"
              disabled={processing}
            >
              OK
            </Button>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Container>
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
