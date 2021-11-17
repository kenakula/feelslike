import EditInfoPage from 'app/pages/EditInfoPage/EditInfoPage';
import { AuthProvider } from 'app/stores/auth/auth-provider';
import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateWrapper';
import { Routes } from './routes';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const JournalPage = lazy(() => import('../pages/JournalPage/JournalPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

const RouterComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path={Routes.LOGIN} component={LoginPage} />
          <Route path={Routes.SIGNUP} component={SignupPage} />
          <PrivateRoute exact path={Routes.DEFAULT} component={MainPage} />
          <PrivateRoute exact path={Routes.JOURNAL} component={JournalPage} />
          <PrivateRoute
            exact
            path={Routes.EDIT_INFO}
            component={EditInfoPage}
          />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default RouterComponent;
