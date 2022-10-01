import React from 'react';
import { Container, Note, PageHeading } from 'app/components';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { noteMocks } from 'app/stores/mocks/notes-mock';
import { NavLink } from 'react-router-dom';
import { JOURNAL_PAGE_PATH } from 'app/router';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export const HomePage = observer((): JSX.Element => {
  return (
    <Container sx={{ pt: 5 }}>
      <h1 className="visually-hidden">Главная страница</h1>
      <PageHeading title="Последние записи" component="h2" />
      <Stack spacing={2} sx={{ mb: 2 }}>
        {noteMocks.slice(0, 3).map(note => (
          <Note key={note.id} note={note} />
        ))}
      </Stack>
      <Link component={NavLink} to={JOURNAL_PAGE_PATH} underline="hover">
        Смотреть все
      </Link>
      <Divider light sx={{ my: 2 }} />
    </Container>
  );
});
