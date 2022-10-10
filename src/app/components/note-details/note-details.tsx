import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useRootStore } from 'app/stores';
import Box from '@mui/material/Box';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import Typography from '@mui/material/Typography';
import { MapNotesTypes } from '../note/assets';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button, DialogActions } from '@mui/material';
import { NoteModel } from 'app/models';

interface Props {
  openState: boolean;
  note: NoteModel | null;
  handleClose: () => void;
  openSnackbar: () => void;
}

export const NoteDetails = ({
  note,
  openState,
  handleClose,
  openSnackbar,
}: Props): JSX.Element | null => {
  const {
    notesStore: { deleteNote, getNotes, bootState },
    authStore: { userData },
  } = useRootStore();

  if (!note) {
    return null;
  }

  const { title, emotions, desc, date, type, secondary, quiz, id } = note;

  const handleDelete = (): void => {
    if (!userData) {
      return;
    }

    deleteNote(id, userData.uid).then(() => {
      openSnackbar();
      getNotes(userData.uid);
      handleClose();
    });
  };

  return (
    <Dialog
      open={openState}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '100%',
          pb: 2,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          position: 'relative',
          py: 2,
          px: 6,
        }}
      >
        <Typography textAlign="center" variant="h6" component="h3">
          {title}
        </Typography>
        <IconButton
          onClick={() => handleClose()}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption">{MapNotesTypes[type]}</Typography>
            <Typography variant="caption">
              {date.toDate().toLocaleDateString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mr: 1,
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
        </Box>
        {secondary && secondary.length ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 1,
              '.MuiChip-root': {
                mr: 1,
                '&:last-child': { mr: 0 },
              },
            }}
          >
            {secondary.map(feel => (
              <Chip size="small" key={feel} variant="outlined" label={feel} />
            ))}
          </Box>
        ) : null}
        {desc && <Typography variant="body1">{desc}</Typography>}
        {quiz && (
          <Stack spacing={2}>
            {quiz.map(({ question, answer }) => {
              if (answer.length) {
                return (
                  <Box key={question}>
                    <Typography variant="h6">{question}</Typography>
                    <Typography variant="body1">{answer}</Typography>
                  </Box>
                );
              }

              return null;
            })}
          </Stack>
        )}
      </Box>
      <DialogActions sx={{ px: 2, py: 0 }}>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={bootState === 'loading'}
          size="small"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
