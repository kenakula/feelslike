import React, { useEffect } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RECOVER_PAGE_PATH, SIGNUP_PAGE_PATH } from 'app/router';
import { Copyright, InputComponent } from 'app/components';
import { ReactComponent as LoginImage } from 'assets/img/login.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/icon-google.svg';
import { FormModel, formSchema } from './assets';
import { NavLink } from 'react-router-dom';
import { AuthError } from 'app/components/auth-error/auth-error';
import { observer } from 'mobx-react-lite';
import { useRootStore } from 'app/stores';

export const SignInPage = observer((): JSX.Element => {
  const {
    authStore: {
      error,
      bootState,
      signInWithEmail,
      signInWithGoogle,
      resetState,
    },
  } = useRootStore();

  useEffect(() => {
    resetState();
  }, [resetState]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormModel): void => {
    signInWithEmail(data);
  };

  const handleGoogleSignIn = (): void => {
    signInWithGoogle();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: 'relative',
        paddingTop: '40px',
      }}
    >
      <Box
        sx={{
          width: '60%',
          maxWidth: '375px',
          margin: '0 auto 40px',
          svg: {
            maxWidth: '100%',
            height: 'auto',
          },
        }}
      >
        <LoginImage />
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: '10',
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ alignSelf: 'center' }}>
          Войти
        </Typography>
        {bootState === 'error' && error ? <AuthError message={error} /> : null}
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
            styles={{ mb: 1 }}
          />
          <InputComponent<FormModel>
            formControl={control}
            name="password"
            label="Пароль"
            fullwidth
            type="password"
            error={!!errors.password}
            errorMessage="Введите пароль"
            styles={{ mt: 1 }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<ExitToAppIcon />}
            loadingPosition="start"
            loading={bootState === 'loading'}
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </LoadingButton>
          <Button
            size="small"
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={bootState === 'loading'}
            sx={{ mb: 2 }}
          >
            Войти с Google
          </Button>
          <Grid container>
            <Grid item xs={6}>
              <Link to={RECOVER_PAGE_PATH} component={NavLink} variant="body2">
                Забыли пароль?
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
      <Copyright />
    </Container>
  );
});
