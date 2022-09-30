import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SIGNIN_PAGE_PATH,
  RECOVER_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  HOME_PAGE_PATH,
  JOURNAL_PAGE_PATH,
  STATISTICS_PAGE_PATH,
} from './routes';
import {
  DashboardPage,
  RecoverPage,
  SignInPage,
  SignUpPage,
  JournalPage,
  StatisticsPage,
} from 'app/pages';
import { ErrorBoundary, Footer, Header } from 'app/components';
import { PrivateRoute } from './private-route';
import { ProtectedRoute } from './protected-route';

export const RouterComponent = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Footer />
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
            path={JOURNAL_PAGE_PATH}
            element={
              <PrivateRoute>
                <JournalPage />
              </PrivateRoute>
            }
          />
          <Route
            path={STATISTICS_PAGE_PATH}
            element={
              <PrivateRoute>
                <StatisticsPage />
              </PrivateRoute>
            }
          />
          {/* protected routes */}
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
