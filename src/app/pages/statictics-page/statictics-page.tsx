import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Loader, NothingFound, PageHeading } from 'app/components';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import { BarChart, PieChart } from './components';

export const StatisticsPage = observer((): JSX.Element => {
  const {
    notesStore: { bootState, notes, getNotes, feels },
    authStore: { userData },
  } = useRootStore();

  useEffect(() => {
    if (userData) {
      getNotes(userData.uid);
    }
  }, [userData, getNotes]);

  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Ваша статистика" />
      {bootState === 'success' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {notes.length ? (
            <>
              <PieChart notes={notes} feels={feels} />
              <BarChart notes={notes} />
            </>
          ) : (
            <NothingFound />
          )}
        </Box>
      ) : (
        <Loader />
      )}
    </Container>
  );
});
