import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NoteModel } from 'app/models/note-model';
import React from 'react';

interface Props {
  note: NoteModel;
}

export const Note = ({
  note: { type, title, desc, emotions, date },
}: Props): JSX.Element => {
  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 2, borderRadius: '8px' }}>
      <Box
        component="header"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="caption">{type}</Typography>
        <Box>
          {emotions.map(emoji => (
            <span key={emoji}>{emoji}</span>
          ))}
        </Box>
      </Box>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography gutterBottom variant="body1" noWrap>
        {desc}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button size="small" variant="outlined">
          Подробнее
        </Button>
        <Typography variant="caption">
          {date.toDate().toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};
