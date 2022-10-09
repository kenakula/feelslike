import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import { ChartProps, getFeelsNotesCount, COLORS } from '../assets';
import { FeelsModel, NoteModel } from 'app/models';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

interface Props {
  notes: NoteModel[];
  feels: FeelsModel | null;
}

export const PieChart = ({ notes, feels }: Props): JSX.Element => {
  const [pieChartData, setPieChartData] = useState<ChartProps>({
    datasets: [],
  });

  useEffect(() => {
    if (feels && notes) {
      setPieChartData({
        labels: feels.primary,
        datasets: [
          {
            data: feels.primary.map(feel => getFeelsNotesCount(notes, feel)),
            backgroundColor: COLORS,
            borderColor: COLORS,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [feels, notes]);

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        За всё время
      </Typography>
      <Pie
        options={{ responsive: true }}
        data={pieChartData}
        style={{ marginBottom: '20px' }}
      />
    </>
  );
};
