import React from 'react';
import { Container, Note, PageHeading } from 'app/components';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { noteMocks } from 'app/stores/mocks/notes-mock';

export const DashboardPage = observer((): JSX.Element => {
  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Последние записи" />
      <Stack spacing={2}>
        {noteMocks.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </Stack>
    </Container>
  );
});
