import Box from '@mui/material/Box';
import { Note } from 'app/components';
import { NoteModel } from 'app/models';
import React from 'react';

interface Props {
  notes: NoteModel[];
  selectNote: (note: NoteModel) => void;
}

export const NotesList = ({ notes, selectNote }: Props): JSX.Element => {
  return (
    <>
      {notes.map(note => (
        <Box key={note.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
          <Note note={note} openDetails={() => selectNote(note)} />
        </Box>
      ))}
    </>
  );
};
