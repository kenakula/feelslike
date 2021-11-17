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
import './SignupPage.scss';
import { AccountCircle } from '@mui/icons-material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from 'app/stores/auth/auth-provider';
import { LoadingButton } from '@mui/lab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Container from 'app/containers/Container/Container';

const validationSchema = yup.object({
  login: yup.string().required('Введи свое имя'),
  email: yup
    .string()
    .email('Введи валидный email адрес')
    .required('Почта обязательная'),
  password: yup
    .string()
    .min(6, 'Пароль должен иметь не менее 6 символов')
    .required('Пароль обязателен'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

interface FormValues {
  login: string;
  email: string;
  password: string;
}

const SignupPage = observer(() => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, updateInfo } = useAuth();
  const history = useHistory();

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      setErrorMessage('');
      await signup(values.email, values.password, values.login);
      await updateInfo(values.login);
      history.push('/login');
    } catch (err) {
      setErrorMessage('ошибка при регистрации');
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="signup-page">
      <Container>
        <Box
          component="form"
          className="signup-page__form"
          onSubmit={formik.handleSubmit}
        >
          <Typography className="signup-page__title" variant="h4">
            Регистрация
          </Typography>
          {errorMessage ? (
            <Alert sx={{ mb: 2 }} severity="error">
              {errorMessage}
            </Alert>
          ) : null}
          <TextField
            className="signup-page__field"
            fullWidth
            id="login"
            name="login"
            type="text"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            label="введи имя"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            className="signup-page__field"
            fullWidth
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="введи почту"
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
            className="signup-page__field"
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
          <TextField
            className="signup-page__field"
            fullWidth
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
            label="повтори пароль"
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
            startIcon={<ExitToAppIcon />}
            loading={loading}
            loadingPosition="start"
          >
            Зарегистрироваться
          </LoadingButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <NavLink to="/login" className="signup-page__back-btn">
            <Button component="span" variant="text" color="info">
              Войти
            </Button>
          </NavLink>
        </Box>
      </Container>
    </div>
  );
});

export default SignupPage;
