import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props): JSX.Element => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
