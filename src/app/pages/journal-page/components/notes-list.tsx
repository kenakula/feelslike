import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Note } from 'app/components';
import { NoteModel } from 'app/models';
import { MONTHS } from 'app/shared/assets';

interface Props {
  notes: NoteModel[];
  selectNote: (note: NoteModel) => void;
}

export const NotesList = ({ notes, selectNote }: Props): JSX.Element => {
  let currentYear: number = new Date().getFullYear();
  let currentMonth: number = new Date().getMonth();

  return (
    <>
      {notes.map(note => {
        const noteDate = note.date.toDate();
        const noteYear = noteDate.getFullYear();
        const noteMonth = noteDate.getMonth();

        if (currentMonth !== noteMonth && currentYear !== noteYear) {
          currentYear = noteYear;
          currentMonth = noteMonth;
          const monthName = MONTHS.find(({ index }) => index === noteMonth);

          return (
            <>
              <Box key={note.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label={noteYear} />
                </Divider>
                <Typography variant="caption" component="p" sx={{ mb: 1 }}>
                  {monthName && monthName.name}
                </Typography>
                <Note note={note} openDetails={() => selectNote(note)} />
              </Box>
            </>
          );
        }

        if (currentYear !== noteYear) {
          currentYear = noteYear;

          return (
            <>
              <Box key={note.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label={noteYear} />
                </Divider>
                <Note note={note} openDetails={() => selectNote(note)} />
              </Box>
            </>
          );
        }

        if (currentMonth !== noteMonth) {
          currentMonth = noteMonth;

          const monthName = MONTHS.find(({ index }) => index === noteMonth);

          return (
            <Box key={note.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
              <Typography variant="caption" component="p" sx={{ mb: 1 }}>
                {monthName && monthName.name}
              </Typography>
              <Note note={note} openDetails={() => selectNote(note)} />
            </Box>
          );
        }

        return (
          <Box key={note.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
            <Note note={note} openDetails={() => selectNote(note)} />
          </Box>
        );
      })}
    </>
  );
};
