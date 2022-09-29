import React from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/components';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';

export const DashboardPage = observer((): JSX.Element => {
  const {
    authStore: { logOut },
  } = useRootStore();

  return (
    <Container>
      <Button
        onClick={() => {
          logOut();
        }}
      >
        logout
      </Button>
    </Container>
  );
});
