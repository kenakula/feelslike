import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { NoteModel } from 'app/models/note-model';

interface Props {
  note: NoteModel;
}

export const Note = ({
  note: { title, desc, emotions, date, secondary },
}: Props): JSX.Element => {
  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 2, borderRadius: '8px' }}>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          img: { mr: 1, '&:last-child': { mr: 0 } },
        }}
      >
        {emotions.map((emoji, index) => (
          <Emoji
            // eslint-disable-next-line react/no-array-index-key
            key={`${emoji}-${index}`}
            unified={emoji}
            emojiStyle={EmojiStyle.APPLE}
            size={20}
          />
        ))}
      </Box>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      {secondary && secondary.length ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: 2,
            '.MuiChip-root': {
              mr: 1,
              '&:last-child': { mr: 0 },
            },
          }}
        >
          {secondary.map(feel => (
            <Chip key={feel} variant="outlined" label={feel} />
          ))}
        </Box>
      ) : null}
      {desc.length ? (
        <Typography sx={{ mb: 2 }} variant="body1" noWrap>
          {desc}
        </Typography>
      ) : null}
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
