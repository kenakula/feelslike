import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import {
  Alert,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import './LoginPage.scss';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from 'assets/images/icon-google.svg';
import Facebook from 'assets/images/icon-facebook.svg';
import { NavLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from 'app/stores/auth/auth-provider';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Введи валидный адрес почты')
    .required('Почта обязательна'),
  password: yup
    .string()
    .min(6, 'Пароль должен иметь не менее 6 символов')
    .required('Пароль обязателен'),
});

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = observer((): JSX.Element => {
  const { login, loginWithGoogle } = useAuth();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const goToMain = () => {
    history.push('/');
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setErrorMessage('');
      setLoading(true);
      await login(values.email, values.password);
      goToMain();
    } catch (err) {
      console.log(err);
      setErrorMessage('ошибка доступа');
      setLoading(false);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage('');
      setLoading(true);
      await loginWithGoogle(goToMain);
    } catch (error) {
      console.log(error);
      setErrorMessage('ошибка доступа');
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="login-page">
      <Box
        component="form"
        className="login-page__form"
        onSubmit={formik.handleSubmit}
      >
        <Typography className="login-page__title" variant="h4">
          Войти
        </Typography>
        {errorMessage ? (
          <Alert sx={{ mb: 2 }} severity="error">
            {errorMessage}
          </Alert>
        ) : null}
        <TextField
          id="email"
          name="email"
          className="login-page__field"
          fullWidth
          label="введи почту"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          className="login-page__field"
          fullWidth
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          label="введи пароль"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <LoadingButton
          variant="contained"
          type="submit"
          startIcon={<SaveIcon />}
          loading={loading}
          loadingPosition="start"
        >
          Войти
        </LoadingButton>
      </Box>
      <Box className="login-page__socials">
        <Button
          className="login-page__login-btn"
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
        >
          Войти с помощью Google
        </Button>
        <Button
          className="login-page__login-btn"
          variant="outlined"
          fullWidth
          startIcon={<Facebook />}
          disabled={true}
        >
          Войти с помощью Facebook
        </Button>
      </Box>
      <Box className="login-page__signup">
        <NavLink className="login-page__signup-link" to="/signup">
          <Button component="span" color="info">
            Зарегистрироваться
          </Button>
        </NavLink>
      </Box>
    </div>
  );
});

export default LoginPage;
