import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  BarElement,
  LinearScale,
} from 'chart.js';
import { ChartProps, MONTHS } from '../assets';
import { NoteModel } from 'app/models';
import { observer } from 'mobx-react-lite';

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

interface Props {
  notes: NoteModel[];
}

export const BarChart = observer(({ notes }: Props): JSX.Element => {
  const [barChartData, setBarChartData] = useState<ChartProps>({
    datasets: [],
  });

  useEffect(() => {
    if (notes) {
      setBarChartData({
        labels: MONTHS.map(month => month.name),
        datasets: [
          {
            data: MONTHS.map(() => Math.random() * 1000),
            backgroundColor: '#8ecae6',
          },
        ],
      });
    }
  }, [notes]);

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        Выберите год
      </Typography>
      <Bar
        style={{ marginBottom: '40px' }}
        options={{ responsive: true, plugins: undefined }}
        data={barChartData}
      />
    </>
  );
});
