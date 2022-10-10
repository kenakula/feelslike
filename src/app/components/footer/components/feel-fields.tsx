import React from 'react';
import { Box, IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {
  SelectComponent,
  InputComponent,
} from 'app/components/form-components';
import { FeelsModel } from 'app/models';
import { Control, FieldErrorsImpl } from 'react-hook-form';
import { NewNoteModel, FormErrors } from '../assets';

interface Props {
  formControl: Control<NewNoteModel, any>;
  errors: FieldErrorsImpl<FormErrors>;
  feels: FeelsModel | null;
  emojies: string[];
  openEmojiDialog: () => void;
  secondaryOptions: string[];
}

export const FeelFields = ({
  formControl,
  errors,
  feels,
  emojies,
  openEmojiDialog,
  secondaryOptions,
}: Props): JSX.Element => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SelectComponent<NewNoteModel>
          formControl={formControl}
          id="primary-feel-select"
          name="title"
          label="Выберите основное чувство"
          variant="outlined"
          color="primary"
          error={!!errors.title}
          errorMessage="Введите чувство"
          options={
            feels
              ? feels.primary.map(feel => ({
                  value: feel,
                  label: feel,
                }))
              : [{ value: 'Нет вариантов', label: 'Нет вариантов' }]
          }
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
      <SelectComponent<NewNoteModel>
        formControl={formControl}
        id="secondary-feel-select"
        name="secondaryFeels"
        label="Выберите дополнительное"
        variant="outlined"
        color="primary"
        multiple
        options={secondaryOptions.map(feel => ({
          value: feel,
          label: feel,
        }))}
        small
      />
      <InputComponent<NewNoteModel>
        formControl={formControl}
        name="desc"
        label="Дополните текстом"
        fullwidth
        type="text"
        multiline={4}
        small
      />
    </>
  );
};
