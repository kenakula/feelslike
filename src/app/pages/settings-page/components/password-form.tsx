import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SnackBarStateProps } from 'app/shared/types';
import { AuthError, User, updatePassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { PasswordModel, passwordSchema } from '../assets';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputComponent } from 'app/components';

interface Props {
  currentUser: User;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackBarStateProps>>;
  setError: (message: string) => void;
}

export const PasswordForm = ({
  currentUser,
  setSnackbarState,
  setError,
}: Props): JSX.Element => {
  const [processing, setProcessing] = useState(false);

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors },
  } = useForm<PasswordModel>({
    defaultValues: { password: '' },
    resolver: yupResolver(passwordSchema),
  });

  const setNewPassword = ({ password }: PasswordModel): void => {
    setProcessing(true);

    updatePassword(currentUser, password)
      .then(() => {
        passwordReset();
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          message: 'Пароль обновлен',
          alert: 'success',
        }));
        setProcessing(false);
      })
      .catch((err: AuthError) => {
        setError(err.message);
        setProcessing(false);
      });
  };

  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}
      component="form"
      onSubmit={handlePasswordSubmit(setNewPassword)}
    >
      <Typography sx={{ mb: 1, display: 'block', width: '100%' }} variant="h6">
        Сменить пароль:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <InputComponent
          formControl={passwordControl}
          fullwidth
          name="password"
          label="Ваш новый пароль"
          type="password"
          small
          styles={{ mr: 2 }}
          error={!!passwordErrors.password}
          errorMessage={
            passwordErrors.password && passwordErrors.password.message
          }
        />
        <Button variant="contained" disabled={processing} type="submit">
          OK
        </Button>
      </Box>
    </Box>
  );
};
