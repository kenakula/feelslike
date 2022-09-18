import React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SIGNIN_PAGE_PATH } from 'app/routes';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as WelcomeImage } from 'assets/img/welcome.svg';
import { Copyright, InputComponent } from 'app/components';
import { FormModel, formSchema } from './assets';

export const SignUpPage = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormModel): void => {
    console.log(data);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: 'relative',
        paddingTop: '180px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '100%',
          maxWidth: '150px',
          margin: '0 auto',
          transform: 'translateX(-50%)',
          svg: {
            maxWidth: '100%',
            height: 'auto',
          },
        }}
      >
        <WelcomeImage />
      </Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
          <InputComponent<FormModel>
            formControl={control}
            name="confirmPassword"
            label="Повторите пароль"
            fullwidth
            type="password"
            error={!!errors.confirmPassword}
            errorMessage="Пароли не совпадают"
            styles={{ mt: 1 }}
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
            Зарегистрироваться
          </LoadingButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Link variant="body2" component={NavLink} to={SIGNIN_PAGE_PATH}>
                Есть аккаунт? Войти.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};
