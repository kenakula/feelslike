import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { InputComponent } from 'app/components';
import { SnackBarStateProps } from 'app/types';
import { updateEmail, AuthError, User } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailModel, emailSchema } from '../assets';

interface Props {
  currentUser: User;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackBarStateProps>>;
  setError: (message: string) => void;
}

export const EmailForm = ({
  currentUser,
  setSnackbarState,
  setError,
}: Props): JSX.Element => {
  const [processing, setProcessing] = useState(false);
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
  } = useForm<EmailModel>({
    defaultValues: { email: '' },
    resolver: yupResolver(emailSchema),
  });

  const setNewEmail = ({ email }: EmailModel): void => {
    setProcessing(true);

    updateEmail(currentUser, email)
      .then(() => {
        emailReset();
        setSnackbarState(prev => ({
          ...prev,
          isOpen: true,
          message: 'Почта обновлена',
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
      onSubmit={handleEmailSubmit(setNewEmail)}
    >
      <Typography sx={{ mb: 1, display: 'block', width: '100%' }} variant="h6">
        Сменить почту:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <InputComponent
          formControl={emailControl}
          fullwidth
          name="email"
          label="Ваш новый email"
          type="email"
          small
          styles={{ mr: 2 }}
          error={!!emailErrors.email}
          errorMessage={emailErrors.email && emailErrors.email.message}
        />
        <Button variant="contained" disabled={processing} type="submit">
          OK
        </Button>
      </Box>
    </Box>
  );
};
