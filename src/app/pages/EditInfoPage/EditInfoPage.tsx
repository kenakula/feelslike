/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import Container from 'app/containers/Container/Container';
import { Button, Divider, TextField, Typography } from '@mui/material';
import Layout from 'app/containers/layout/layout';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/system';
import './EditInfoPage.scss';
import { EditInfoPageStoreContext } from 'app/stores/editInfoPage/editInfoPageStore';
import { observer } from 'mobx-react';
import { BootState } from 'app/constants/boot-state';
import ThreeBounce from 'app/components/ThreeBounce/ThreeBounce';
import { useAuth } from 'app/stores/auth/auth-provider';
import { LoadingButton } from '@mui/lab';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const loginValidationSchema = yup.object({
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

const emailValidationSchema = yup.object({
  email: yup
    .string()
    .email('Введи валидный email адрес')
    .required('Почта обязательная'),
});

const passValidationSchema = yup.object({
  password: yup
    .string()
    .min(6, 'Пароль должен иметь не менее 6 символов')
    .required('Пароль обязателен'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

interface loginFormValues {
  login: string;
}

interface emailFormValues {
  email: string;
}

interface passFormValues {
  password: string;
}

const EditInfoPage = observer(() => {
  const editPageStore = useContext(EditInfoPageStoreContext);
  const { currentUser } = useAuth();

  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    editPageStore?.init();
  }, [editPageStore]);

  const handleLoginChange = async (values: loginFormValues) => {
    try {
      setLoginLoading(true);
      if (currentUser) {
        editPageStore?.updateName(currentUser, values.login);
      }
      setLoginLoading(false);
    } catch (err) {
      console.log(err);
      setLoginLoading(false);
    }
  };

  const loginForm = useFormik({
    initialValues: {
      login: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values: loginFormValues) => {
      console.log('submited');
      await handleLoginChange(values);
    },
  });

  const emailForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values: emailFormValues) => {
      console.log(values);
    },
  });

  const passWordForm = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: passValidationSchema,
    onSubmit: (values: passFormValues) => {
      console.log(values);
    },
  });

  return (
    <Layout>
      {editPageStore && editPageStore.bootState === BootState.Success ? (
        <Container className="edit-info">
          <Box
            component="form"
            className="edit-info__field"
            name="login-edit"
            onSubmit={loginForm.handleSubmit}
          >
            <Typography className="edit-info__title" variant="h5">
              Сменить имя
            </Typography>
            <TextField
              className="edit-info__input"
              variant="outlined"
              id="login"
              name="login"
              type="text"
              value={loginForm.values.login}
              onChange={loginForm.handleChange}
              error={loginForm.touched.login && Boolean(loginForm.errors.login)}
              helperText={loginForm.touched.login && loginForm.errors.login}
              label="введи имя"
              fullWidth
            />
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loginLoading}
              loadingPosition="start"
              startIcon={<EditOutlinedIcon />}
            >
              Изменить
            </LoadingButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            component="form"
            className="edit-info__field"
            name="email-edit"
            onSubmit={loginForm.handleSubmit}
          >
            <Typography className="edit-info__title" variant="h5">
              Сменить почту
            </Typography>
            <TextField
              className="edit-info__input"
              variant="outlined"
              label="введите почту"
              id="email"
              value={emailForm.values.email}
              onChange={emailForm.handleChange}
              error={emailForm.touched.email && Boolean(emailForm.errors.email)}
              helperText={emailForm.touched.email && emailForm.errors.email}
              fullWidth
            />
            <Button variant="contained">Изменить</Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            component="form"
            className="edit-info__field"
            name="password-edit"
            onSubmit={loginForm.handleSubmit}
          >
            <Typography className="edit-info__title" variant="h5">
              Сменить пароль
            </Typography>
            <TextField
              className="edit-info__input"
              variant="outlined"
              label="новый пароль"
              id="pass"
              value={passWordForm.values.password}
              onChange={passWordForm.handleChange}
              error={
                passWordForm.touched.password &&
                Boolean(passWordForm.errors.password)
              }
              helperText={
                passWordForm.touched.password && passWordForm.errors.password
              }
              fullWidth
            />
            <TextField
              className="edit-info__input"
              variant="outlined"
              label="повторите пароль"
              id="pass-repeat"
              value={passWordForm.values.passwordConfirm}
              onChange={passWordForm.handleChange}
              error={
                passWordForm.touched.passwordConfirm &&
                Boolean(passWordForm.errors.passwordConfirm)
              }
              helperText={
                passWordForm.touched.passwordConfirm &&
                passWordForm.errors.passwordConfirm
              }
              fullWidth
            />
            <Button variant="contained">Изменить</Button>
          </Box>
        </Container>
      ) : (
        <ThreeBounce />
      )}
    </Layout>
  );
});

export default EditInfoPage;
