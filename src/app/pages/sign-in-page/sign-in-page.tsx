import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RECOVER_PAGE_PATH, SIGNUP_PAGE_PATH } from 'app/routes';
import { Copyright, InputComponent } from 'app/components';
import { ReactComponent as LoginImage } from 'assets/img/login.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/icon-google.svg';
import { FormModel, formSchema } from './assets';
import { useAppDispatch, useAppSelector } from 'app/store';
import { logout, signInWithEmail, signInWithGoogle } from 'app/store/userSlice';
import { NavLink } from 'react-router-dom';

export const SignInPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const bootState = useAppSelector(state => state.user.bootState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormModel): void => {
    dispatch(signInWithEmail(data));
  };

  const handleGoogleSignIn = (): void => {
    dispatch(signInWithGoogle());
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: 'relative',
        paddingTop: '250px',
      }}
    >
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '100%',
          maxWidth: '375px',
          margin: '0 auto',
          transform: 'translateX(-50%)',
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
            Войти
          </Typography>
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
              sx={{ mb: 2 }}
            >
              Войти с помощью Google
            </Button>
            <Grid container>
              <Grid item xs={6}>
                <Link
                  to={RECOVER_PAGE_PATH}
                  component={NavLink}
                  variant="body2"
                >
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
      </Box>
      <Copyright />
    </Container>
  );
};
