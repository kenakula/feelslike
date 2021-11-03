import { AuthProvider } from 'app/stores/auth/auth-provider';
import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateWrapper';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const JournalPage = lazy(() => import('../pages/JournalPage/JournalPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

const RouterComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/journal" component={JournalPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default RouterComponent;
