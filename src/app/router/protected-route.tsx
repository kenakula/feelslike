import React from 'react';
import { useAppSelector } from 'app/store';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const authState = useAppSelector(state => state.auth.authState);

  if (authState === 'NotAuthorized') {
    return children;
  }

  return <Navigate to="/" />;
};
