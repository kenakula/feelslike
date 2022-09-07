import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HOME_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  RECOVER_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
} from './routes';
import { HomePage, RecoverPage, SigninPage, SignupPage } from 'app/pages';
import { Header } from 'app/components/header/header';
import { PrivateRoute } from './private-route';
import { DashboardPage } from 'app/pages/dashboard-page';

export const RouterComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={DASHBOARD_PAGE_PATH}
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path={HOME_PAGE_PATH} element={<HomePage />} />
        <Route path={SIGNIN_PAGE_PATH} element={<SigninPage />} />
        <Route path={SIGNUP_PAGE_PATH} element={<SignupPage />} />
        <Route path={RECOVER_PAGE_PATH} element={<RecoverPage />} />
      </Routes>
    </BrowserRouter>
  );
};
