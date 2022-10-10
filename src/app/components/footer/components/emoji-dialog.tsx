import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Props {
  close: () => void;
  openState: boolean;
  onClick: (emojiData: EmojiClickData) => void;
  emojies: string[];
  deleteEmoji: () => void;
}

export const EmojiDialog = ({
  close,
  openState,
  onClick,
  emojies,
  deleteEmoji,
}: Props): JSX.Element => {
  return (
    <Dialog onClose={close} open={openState}>
      <DialogTitle
        textAlign="center"
        sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}
      >
        Выберите эмоджи
        <IconButton onClick={close}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Typography variant="caption" sx={{ px: 2 }}>
        постарайтесь выбрать не больше 5
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Box
          sx={{ mr: 1, display: 'flex', flexWrap: 'wrap', minHeight: '38px' }}
        >
          {emojies.length
            ? emojies.map((emoji, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${emoji}-${index}`}
                  component="span"
                  sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
                >
                  <Emoji
                    unified={emoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={25}
                  />
                </Box>
              ))
            : null}
        </Box>
        {emojies.length ? (
          <IconButton onClick={deleteEmoji}>
            <BackspaceIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>
      <EmojiPicker
        onEmojiClick={onClick}
        theme={Theme.AUTO}
        previewConfig={{
          showPreview: false,
        }}
        searchPlaceHolder="Поиск"
        skinTonesDisabled
        width={300}
        height={400}
      />
      <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={close}
          size="small"
        >
          Сохранить
        </Button>
      </Box>
    </Dialog>
  );
};
