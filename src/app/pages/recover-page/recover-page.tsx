import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { LoadingButton } from '@mui/lab';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from 'app/router';
import { Copyright, InputComponent } from 'app/components';
import { AuthError } from 'app/components/auth-error/auth-error';
import { RecoverPasswordEmailModel } from 'app/models';
import { useRootStore } from 'app/stores';
import { FormModel, formSchema } from './assets';
import { ReactComponent as RecoverImage } from 'assets/img/restore-password.svg';

export const RecoverPage = observer((): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const {
    authStore: { bootState, error, resetPassword, resetState },
  } = useRootStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '' },
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    resetState();
  }, []);

  const onSubmit = (data: RecoverPasswordEmailModel): void => {
    setProcessing(true);
    resetPassword(data).then(() => {
      setSuccessMessage('Проверьте почту.');
      setProcessing(false);
    });
  };

  const getAlert = (): JSX.Element | null => {
    if (bootState === 'error' && error) {
      return <AuthError message={error} />;
    }

    if (successMessage) {
      return (
        <Alert sx={{ mb: 1 }} severity="success">
          {successMessage}
        </Alert>
      );
    }

    return null;
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: 'relative',
        paddingTop: '230px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto',
          transform: 'translateX(-50%)',
          svg: {
            maxWidth: '100%',
            height: 'auto',
          },
        }}
      >
        <RecoverImage />
      </Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: '10',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', alignSelf: 'center' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ alignSelf: 'center' }}>
            Сбросить пароль
          </Typography>
          <Typography sx={{ mb: 2 }} variant="caption" textAlign="center">
            На указанную почту будет отправлено письмо с инструкцией к сбросу
            пароля
          </Typography>
          {getAlert()}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputComponent<FormModel>
              formControl={control}
              name="email"
              label="Почта"
              fullwidth
              type="email"
              error={!!errors.email}
              errorMessage="Введите корректно почту."
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<ExitToAppIcon />}
              loadingPosition="start"
              loading={processing}
              sx={{ mt: 3, mb: 2 }}
            >
              Сбросить
            </LoadingButton>
            <Grid container>
              <Grid item xs={6}>
                <Link to={SIGNIN_PAGE_PATH} component={NavLink} variant="body2">
                  Есть аккаунт?
                </Link>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Link variant="body2" component={NavLink} to={SIGNUP_PAGE_PATH}>
                  Зарегистрируйтесь.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
});
