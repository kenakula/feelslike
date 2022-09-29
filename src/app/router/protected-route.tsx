import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = observer(({ children }: Props): JSX.Element => {
  const {
    authStore: { authState, bootState },
  } = useRootStore();

  if (authState === 'NotAuthorized' && bootState !== 'success') {
    return children;
  }

  return <Navigate to="/" />;
});
