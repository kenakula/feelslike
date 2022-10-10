import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { SelectComponent } from 'app/components/form-components';
import { FormErrors, NewNoteModel, QuizEntry } from '../assets';
import { Control, FieldErrorsImpl } from 'react-hook-form';
import { FeelsModel } from 'app/models';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';

interface Props {
  formControl: Control<NewNoteModel, any>;
  errors: FieldErrorsImpl<FormErrors>;
  feels: FeelsModel | null;
  emojies: string[];
  openEmojiDialog: () => void;
  secondaryOptions: string[];
  setValues: (entries: QuizEntry[]) => void;
  questionsValues: Record<string, string>;
  setQuestionsValues: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

export const QuizFields = ({
  formControl,
  errors,
  feels,
  emojies,
  openEmojiDialog,
  secondaryOptions,
  setValues,
  questionsValues,
  setQuestionsValues,
}: Props): JSX.Element => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    question: string,
  ): void => {
    const value = e.target.value;
    setQuestionsValues(prev => ({
      ...prev,
      [question]: value,
    }));

    const arr: QuizEntry[] = Object.entries(questionsValues).map(entry => ({
      question: entry[0],
      answer: entry[1],
    }));

    setValues(arr);
  };

  const renderFields = (): JSX.Element[] => {
    return Object.entries(questionsValues).map(entry => {
      const question = entry[0];
      const answer = entry[1];

      return (
        <TextField
          size="small"
          key={question}
          label={question}
          value={answer}
          onChange={e => handleChange(e, question)}
        />
      );
    });
  };

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
      <Divider color="primary" textAlign="center">
        Ответьте на вопросы
      </Divider>
      {renderFields()}
    </>
  );
};
