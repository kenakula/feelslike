import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RECOVER_PAGE_PATH, SIGNUP_PAGE_PATH } from 'app/routes';
import { Copyright } from 'app/components';
import { ReactComponent as LoginImage } from 'assets/img/login.svg';
import { FormModel, formSchema } from './assets';

export const SignInPage = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: any): void => {
    console.log(data);
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
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  label="Почта"
                  fullWidth
                  variant="outlined"
                  type="text"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ my: 1 }}
                  error={!!errors.password}
                  label="Пароль"
                  fullWidth
                  variant="outlined"
                  type="password"
                />
              )}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<ExitToAppIcon />}
              loadingPosition="start"
              loading={false}
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </LoadingButton>
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
