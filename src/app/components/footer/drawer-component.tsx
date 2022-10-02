import React, { useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRootStore } from 'app/stores';
import {
  InputComponent,
  SelectComponent,
} from 'app/components/form-components';
import { LoadingButton } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import SaveIcon from '@mui/icons-material/Save';
import { getNoteModel, NewNoteModel, newNoteSchema } from './assets';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { EmojiClickData } from 'emoji-picker-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { EmojiDialog } from './emoji-dialog';
import { useTheme } from '@mui/material';

export const DrawerComponent = observer((): JSX.Element => {
  const [secondaryOptions, setSecondaryOptions] = useState<string[]>([]);
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

  useEffect(() => {
    setEditorType(noteType);
  }, [noteType, setEditorType]);

  useEffect(() => {
    if (noteType === 'feel' && noteTitle && feels) {
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

  const saveForm = (data: NewNoteModel): void => {
    if (userData) {
      const note = getNoteModel(data);
      saveNote(note, userData.uid).then(() => {
        getNotes(userData.uid);
        reset(defaultValues);
      });
    }
  };

  const getFeelFields = (): JSX.Element | null =>
    feels && (
      <>
        <Box sx={{ display: 'flex' }}>
          <SelectComponent<NewNoteModel>
            formControl={control}
            id="primary-feel-select"
            name="title"
            label="Выберите чувство"
            variant="outlined"
            color="primary"
            error={!!errors.title}
            errorMessage="Введите чувство"
            options={feels.primary.map(feel => ({
              value: feel,
              label: feel,
            }))}
            small
            styles={{ mr: 1 }}
          />
          <IconButton
            color={noteEmojies.length ? 'primary' : undefined}
            onClick={() => setEmojiDialogOpen(true)}
          >
            <InsertEmoticonIcon />
          </IconButton>
        </Box>
        <SelectComponent<NewNoteModel>
          formControl={control}
          id="secondary-feel-select"
          name="secondaryFeels"
          label="Выберите чувство"
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
          formControl={control}
          name="desc"
          label="Дополните"
          fullwidth
          type="text"
          multiline={4}
          small
        />
      </>
    );

  const getRegularFields = (): JSX.Element => (
    <>
      <Box sx={{ display: 'flex' }}>
        <InputComponent<NewNoteModel>
          formControl={control}
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
          color={noteEmojies.length ? 'primary' : undefined}
          onClick={() => setEmojiDialogOpen(true)}
        >
          <InsertEmoticonIcon />
        </IconButton>
      </Box>
      <InputComponent<NewNoteModel>
        formControl={control}
        name="desc"
        label="Введите текст"
        fullwidth
        type="text"
        multiline={4}
        small
      />
    </>
  );

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
      <Typography variant="h5" component="h2" textAlign="center" sx={{ mb: 4 }}>
        Создайте новую запись
      </Typography>
      <Box component="form" onSubmit={handleSubmit(saveForm)}>
        <Stack spacing={2}>
          <SelectComponent<NewNoteModel>
            formControl={control}
            id="type-select"
            name="type"
            label="Выберите тип записи"
            variant="outlined"
            color="primary"
            small
            options={[
              { value: 'feel', label: 'Чувства' },
              { value: 'regular', label: 'Обычная запись' },
            ]}
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
                  renderInput={params => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            )}
          />
          {editorNoteType === 'regular' ? getRegularFields() : getFeelFields()}
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
      </Box>
    </SwipeableDrawer>
  );
});
