import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container, Loader, NothingFound, PageHeading } from 'app/components';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { COLORS, getFeelsNotesCount, ChartProps, MONTHS } from './assets';
import { BarChart, PieChart } from './components';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

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
          <PieChart notes={notes} feels={feels} />
          <BarChart notes={notes} />
        </Box>
      ) : (
        <Loader />
      )}
    </Container>
  );
});
