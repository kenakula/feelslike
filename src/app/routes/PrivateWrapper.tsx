/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'app/stores/auth/auth-provider';

interface Props {
  exact: true;
  path: string;
  component: any;
}

export default function PrivateRoute(props: Props) {
  const { component: Component, ...rest } = props;

  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
