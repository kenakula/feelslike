import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SIGNIN_PAGE_PATH,
  RECOVER_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  HOME_PAGE_PATH,
} from './routes';
import { DashboardPage, RecoverPage, SignInPage, SignUpPage } from 'app/pages';
import { ErrorBoundary, Header } from 'app/components';
import { PrivateRoute } from './private-route';
import { ProtectedRoute } from './protected-route';

export const RouterComponent = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path={HOME_PAGE_PATH}
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path={SIGNIN_PAGE_PATH}
            element={
              <ProtectedRoute>
                <SignInPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={SIGNUP_PAGE_PATH}
            element={
              <ProtectedRoute>
                <SignUpPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RECOVER_PAGE_PATH}
            element={
              <ProtectedRoute>
                <RecoverPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
