import { Button } from '@mui/material';
import { Container } from 'app/components';
import { useAppDispatch } from 'app/store';
import { logout } from 'app/store/userSlice';
import React from 'react';

export const DashboardPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <p>Dasboard</p>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </Button>
    </Container>
  );
};
