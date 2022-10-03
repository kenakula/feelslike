import React from 'react';
import Box from '@mui/material/Box';
import { InputComponent } from 'app/components/form-components';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Control, FieldErrorsImpl } from 'react-hook-form';
import { NewNoteModel, FormErrors } from '../assets';
import IconButton from '@mui/material/IconButton';

interface Props {
  formControl: Control<NewNoteModel, any>;
  errors: FieldErrorsImpl<FormErrors>;
  emojies: string[];
  openEmojiDialog: () => void;
}

export const RegularFields = ({
  formControl,
  errors,
  emojies,
  openEmojiDialog,
}: Props): JSX.Element => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <InputComponent<NewNoteModel>
          formControl={formControl}
          name="title"
          label="Введите короткий заголовок"
          fullwidth
          type="text"
          error={!!errors.title}
          errorMessage="Введите заголовок"
          small
          styles={{ mr: 1 }}
        />
        <IconButton
          color={emojies.length ? 'primary' : undefined}
          onClick={openEmojiDialog}
        >
          <InsertEmoticonIcon />
        </IconButton>
      </Box>
      <InputComponent<NewNoteModel>
        formControl={formControl}
        name="desc"
        label="Введите текст"
        fullwidth
        type="text"
        multiline={4}
        small
      />
    </>
  );
};
