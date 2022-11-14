import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EmojiClickData } from 'emoji-picker-react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { EmojiDialog } from './emoji-dialog';
import { Alert, Snackbar, useTheme } from '@mui/material';
import { SelectComponent } from 'app/components/form-components';
import { useRootStore } from 'app/stores';
import {
  getNoteModel,
  NewNoteModel,
  newNoteSchema,
  QuizEntry,
} from '../assets';
import { QuizFields } from './quiz-fields';
import { RegularFields } from './regular-fields';
import { FeelFields } from './feel-fields';
import { noteTypesOptions } from 'app/shared/note-type-options';

export const NoteDrawer = observer((): JSX.Element => {
  const [secondaryOptions, setSecondaryOptions] = useState<string[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [questionsValues, setQuestionsValues] = useState<
    Record<string, string>
  >({});
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const {
    notesStore: {
      modalOpen,
      setModalState,
      processing,
      feels,
      editorNoteType,
      setEditorType,
      editorNoteDate,
      saveNote,
      getNotes,
    },
    authStore: { userData },
  } = useRootStore();
  const theme = useTheme();

  const defaultValues: NewNoteModel = {
    type: editorNoteType,
    title: '',
    desc: '',
    date: editorNoteDate,
    secondaryFeels: [],
    emojies: [],
    quiz: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    setValue,
  } = useForm<NewNoteModel>({
    defaultValues,
    resolver: yupResolver(newNoteSchema),
  });

  const noteTitle = watch('title');
  const noteType = watch('type');
  const noteEmojies = watch('emojies');

  useEffect(() => {
    setValue('secondaryFeels', []);
    setValue('type', editorNoteType);
  }, [modalOpen, setValue, editorNoteType]);

  const resetQuizFields = useCallback((): void => {
    if (!userData) {
      return;
    }

    const quizQuestions = userData.questions;
    const arr = quizQuestions.map(item => [item, '']);
    const obj: Record<string, string> = Object.fromEntries(arr);

    setQuestionsValues(obj);
  }, [userData]);

  useEffect(() => {
    resetQuizFields();
  }, [resetQuizFields]);

  useEffect(() => {
    setEditorType(noteType);
  }, [noteType, setEditorType]);

  useEffect(() => {
    if ((noteType === 'feel' || noteType === 'quiz') && noteTitle && feels) {
      const arr = feels.secondary.find(obj => obj.parent === noteTitle);
      setSecondaryOptions(arr ? arr.list : []);
    }
  }, [noteTitle, noteType, getValues, feels]);

  useEffect(() => {
    setValue('date', editorNoteDate);
  }, [editorNoteDate, setValue]);

  const onEmojiClick = (emojiData: EmojiClickData): void => {
    setValue('emojies', noteEmojies.concat(emojiData.unified).slice(0, 5));
  };

  const backSpaceClick = (): void => {
    const newArr = noteEmojies.slice(0, -1);
    setValue('emojies', newArr);
  };

  const handleDrawerClose = (): void => {
    setModalState(false);
  };

  const handleDrawerOpen = (): void => {
    setModalState(true);
  };

  const setQuizValue = (entries: QuizEntry[]): void => {
    setValue('quiz', entries);
  };

  const saveForm = (data: NewNoteModel): void => {
    if (userData) {
      const note = getNoteModel(data);
      saveNote(note, userData.uid).then(() => {
        getNotes(userData.uid);
        reset(defaultValues);
        resetQuizFields();
        setSnackOpen(true);
      });
    }
  };

  const renderTypeFields = (): JSX.Element => {
    switch (editorNoteType) {
      case 'quiz':
        return (
          <QuizFields
            formControl={control}
            errors={errors}
            feels={feels}
            emojies={noteEmojies}
            openEmojiDialog={() => setEmojiDialogOpen(true)}
            secondaryOptions={secondaryOptions}
            setValues={setQuizValue}
            questionsValues={questionsValues}
            setQuestionsValues={setQuestionsValues}
          />
        );
      case 'feel':
        return (
          <FeelFields
            formControl={control}
            errors={errors}
            feels={feels}
            emojies={noteEmojies}
            openEmojiDialog={() => setEmojiDialogOpen(true)}
            secondaryOptions={secondaryOptions}
          />
        );
      default:
        return (
          <RegularFields
            formControl={control}
            errors={errors}
            emojies={noteEmojies}
            openEmojiDialog={() => setEmojiDialogOpen(true)}
          />
        );
    }
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={modalOpen}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      PaperProps={{
        sx: {
          padding: '40px 16px 20px',
          borderRadius: '20px 20px 0 0',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 70,
            height: 4,
            borderRadius: '20px',
            background: theme.palette.grey[900],
          },
        },
      }}
    >
      <Box
        sx={{
          maxHeight: '80vh',
          overflowY: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Создайте новую запись
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(saveForm)}
          autoComplete="off"
        >
          <Stack spacing={2}>
            <SelectComponent<NewNoteModel>
              formControl={control}
              id="type-select"
              name="type"
              label="Выберите тип записи"
              variant="outlined"
              color="primary"
              small
              options={noteTypesOptions}
            />
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="Выберите дату"
                    inputFormat="DD/MM/YYYY"
                    {...field}
                    maxDate={new Date()}
                    renderInput={params => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            {feels ? renderTypeFields() : null}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              loadingPosition="start"
              loading={processing}
              size="small"
            >
              Сохранить
            </LoadingButton>
          </Stack>
          <EmojiDialog
            openState={emojiDialogOpen}
            close={() => setEmojiDialogOpen(false)}
            onClick={onEmojiClick}
            deleteEmoji={backSpaceClick}
            emojies={noteEmojies}
          />
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Alert
              onClose={() => setSnackOpen(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              Запись сохранена
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
});
