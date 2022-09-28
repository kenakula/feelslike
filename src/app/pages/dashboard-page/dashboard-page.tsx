import { Button } from '@mui/material';
import { Container } from 'app/components';
import { useAppDispatch } from 'app/store';
import { resetUserState } from 'app/store/user-slice';
import React from 'react';

export const DashboardPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Button onClick={() => {}}>logout</Button>
    </Container>
  );
};
