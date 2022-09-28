import React from 'react';
import { useAppSelector } from 'app/store';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props): JSX.Element => {
  const authState = useAppSelector(state => state.auth.authState);

  if (authState === 'Authorized') {
    return children;
  }

  return <Navigate to="/login" />;
};
