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
import {
  ChartProps,
  getFeelsNotesCount,
  COLORS,
  periodSelectOptions,
  filterNotesByTime,
} from '../assets';
import { FeelsModel, NoteModel } from 'app/models';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TimePeriod } from 'app/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>(notes);
  const [period, setPeriod] = useState<TimePeriod>('all');

  useEffect(() => {
    if (feels && notes) {
      setPieChartData({
        labels: feels.primary,
        datasets: [
          {
            data: feels.primary.map(feel =>
              getFeelsNotesCount(filteredNotes, feel),
            ),
            backgroundColor: COLORS,
            borderColor: COLORS,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [feels, notes, filteredNotes]);

  const handleChange = (event: SelectChangeEvent): void => {
    const timePeriod = event.target.value as TimePeriod;
    setPeriod(event.target.value as TimePeriod);
    setFilteredNotes(filterNotesByTime(notes, timePeriod));
  };

  return (
    <>
      <Typography
        textAlign="center"
        variant="caption"
        component="p"
        sx={{ mb: 2 }}
      >
        На графике ниже учитываются только записи с выбором чувств из
        предложенных вариантов
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-label">Выберите период</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={period}
          label="Выберите период"
          onChange={handleChange}
          size="small"
        >
          {periodSelectOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Pie options={{ responsive: true }} data={pieChartData} />
        <Typography
          variant="caption"
          sx={{ position: 'absolute', right: 0, bottom: '-20px' }}
        >
          Записей: {filteredNotes.length}
        </Typography>
      </Box>
    </>
  );
};
