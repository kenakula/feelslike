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
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
  login: yup.string().required('Enter your login'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
          label="введите логин"
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
          label="введите почту"
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
          label="введите пароль"
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
          label="повторите пароль"
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
      <NavLink to="/login">
        <Button
          component="span"
          variant="outlined"
          color="info"
          className="signup__back-btn"
        >
          Назад
        </Button>
      </NavLink>
    </div>
  );
});

export default SignupPage;
