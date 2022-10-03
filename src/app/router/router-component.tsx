import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SIGNIN_PAGE_PATH,
  RECOVER_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  HOME_PAGE_PATH,
  JOURNAL_PAGE_PATH,
  STATISTICS_PAGE_PATH,
  SETTINGS_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from './routes';
import {
  HomePage,
  RecoverPage,
  SignInPage,
  SignUpPage,
  JournalPage,
  StatisticsPage,
  SettingsPage,
  ProfilePage,
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
                <HomePage />
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
          <Route
            path={SETTINGS_PAGE_PATH}
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PROFILE_PAGE_PATH}
            element={
              <PrivateRoute>
                <ProfilePage />
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
