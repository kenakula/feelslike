import { useAppSelector } from 'app/store';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props): JSX.Element => {
  const authState = useAppSelector(state => state.user.authState);

  if (authState === 'Authorized') {
    return children;
  }

  return <Navigate to="/login" />;
};