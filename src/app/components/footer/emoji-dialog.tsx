import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EmojiPicker, {
  Categories,
  Emoji,
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from 'emoji-picker-react';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';

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
          mb: 2,
          px: 2,
        }}
      >
        <Box sx={{ mr: 1, display: 'flex', flexWrap: 'wrap' }}>
          {emojies.length
            ? emojies.map((emoji, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${emoji}-${index}`}
                  component="span"
                  sx={{ mr: 1, display: 'flex' }}
                >
                  <Emoji
                    unified={emoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={30}
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
        autoFocusSearch={false}
        theme={Theme.AUTO}
        lazyLoadEmojis
        previewConfig={{
          defaultCaption: 'Выберите наиболее подходящее эмоджи',
          showPreview: false,
        }}
        suggestedEmojisMode={SuggestionMode.FREQUENT}
        skinTonesDisabled
        searchPlaceHolder="Поиск"
        emojiStyle={EmojiStyle.APPLE}
        categories={[
          {
            name: 'Smiles & Emotions',
            category: Categories.SMILEYS_PEOPLE,
          },
          {
            name: 'Animals',
            category: Categories.ANIMALS_NATURE,
          },
        ]}
      />
      <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={close}>
          Сохранить
        </Button>
      </Box>
    </Dialog>
  );
};
