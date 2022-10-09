import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  BarElement,
  LinearScale,
} from 'chart.js';
import { observer } from 'mobx-react-lite';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { NoteModel } from 'app/models';
import { MONTHS } from '../assets';
import { ChartProps } from 'app/shared/types';

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

interface Props {
  notes: NoteModel[];
}

export const BarChart = observer(({ notes }: Props): JSX.Element => {
  const [barChartData, setBarChartData] = useState<ChartProps>({
    datasets: [],
  });
  const [selectedDate, setSelectedDate] = useState<Moment>(moment(new Date()));

  const countNotes = useCallback((): void => {
    const currentYear = selectedDate.year();
    const monthsMap = new Map<number, number>();

    MONTHS.forEach(({ index }) => {
      const timeToCompare = new Date(currentYear, index);
      let counter = 0;

      for (let i = 0; i < notes.length; i++) {
        const noteDate = notes[i].date.toDate();
        const isSame = moment(timeToCompare).isSame(noteDate, 'month');
        if (isSame) {
          counter++;
        }
      }

      monthsMap.set(index, counter);
    });

    setBarChartData({
      labels: MONTHS.map(month => month.name),
      datasets: [
        {
          data: Array.from(monthsMap.values()),
          backgroundColor: '#8ecae6',
        },
      ],
    });
  }, [selectedDate, notes]);

  useEffect(() => {
    if (notes) {
      countNotes();
    }
  }, [notes, selectedDate, countNotes]);

  const handleYearChange = (value: Moment | null): void => {
    if (value) {
      setSelectedDate(value);
    }
  };

  return (
    <>
      <Typography
        textAlign="center"
        variant="caption"
        component="p"
        sx={{ mb: 2 }}
      >
        На графике ниже учитываются все записи за календарный год
      </Typography>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          views={['year']}
          onChange={value => handleYearChange(value)}
          value={selectedDate}
          label="Выберите год"
          renderInput={params => (
            <TextField fullWidth sx={{ mb: 2 }} size="small" {...params} />
          )}
        />
      </LocalizationProvider>
      <Bar
        style={{ marginBottom: '40px' }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
        data={barChartData}
      />
    </>
  );
});
