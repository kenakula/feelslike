import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Calendar, {
  CalendarTileProperties,
  ViewCallbackProperties,
} from 'react-calendar';
import moment from 'moment';
import Box from '@mui/material/Box';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { compareDates, filterNotes } from './assets';
import { Alert, Snackbar } from '@mui/material';
import {
  Container,
  Note,
  NoteDetails,
  NothingFound,
  PageHeading,
} from 'app/components';
import { useRootStore } from 'app/stores';
import { NoteModel } from 'app/models';
import { PageSkeleton } from './components';

export const HomePage = observer((): JSX.Element => {
  const [selectedNote, setSelectedNote] = useState<NoteModel | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [snackDeleteOpen, setSnackDeleteOpen] = useState(false);

  const {
    notesStore: {
      notes,
      bootState,
      editorNoteDate,
      setEditorDate,
      getNotesByMonth,
    },
    authStore: { userData },
  } = useRootStore();

  const onResetClick = (): void => {
    setEditorDate(new Date());
    setStartDate(new Date());

    if (userData) {
      getNotesByMonth(userData.uid, new Date());
    }
  };

  const onActiveStartDateChange = ({
    activeStartDate,
  }: ViewCallbackProperties): void => {
    const isSameMonth = moment(startDate).isSame(activeStartDate, 'month');

    if (!isSameMonth) {
      if (userData) {
        getNotesByMonth(userData.uid, activeStartDate);
      }
    }

    setStartDate(activeStartDate);
  };

  useEffect(() => {
    if (userData) {
      getNotesByMonth(userData.uid, new Date());
    }
  }, [userData, getNotesByMonth]);

  const selectNote = (note: NoteModel): void => {
    setSelectedNote(note);
    setDetailsOpen(true);
  };

  const renderNotes = (list: NoteModel[]): JSX.Element =>
    list.length ? (
      <>
        {list.reverse().map(note => (
          <Note
            key={note.id}
            note={note}
            openDetails={() => selectNote(note)}
          />
        ))}
      </>
    ) : (
      <NothingFound />
    );

  const renderContent = (): JSX.Element => (
    <Box>
      <Box sx={{ mb: 5 }}>
        <PageHeading title="Оставьте запись" component="h2">
          <Tooltip title="Вернуться к текущей дате">
            <Box component="span">
              <IconButton
                color="primary"
                onClick={onResetClick}
                disabled={bootState !== 'success'}
              >
                <AutorenewIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </PageHeading>
        <Calendar
          onChange={setEditorDate}
          value={editorNoteDate}
          maxDate={new Date()}
          activeStartDate={startDate}
          onActiveStartDateChange={onActiveStartDateChange}
          tileClassName={({ date }: CalendarTileProperties) => {
            const hasNotes = notes.some(note =>
              compareDates(date, note.date.toDate()),
            );
            return hasNotes ? 'has-notes' : null;
          }}
        />
      </Box>
      <Box>
        <PageHeading
          title={`Записи ${editorNoteDate.toLocaleDateString()}`}
          component="h2"
        />
        <Stack spacing={2} sx={{ mb: 2 }}>
          {renderNotes(filterNotes(notes, editorNoteDate))}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Container sx={{ pt: 5 }}>
      <h1 className="visually-hidden">Главная страница</h1>
      {bootState === 'success' ? renderContent() : <PageSkeleton />}
      {/* modals */}
      <NoteDetails
        note={selectedNote}
        openState={detailsOpen}
        handleClose={() => setDetailsOpen(false)}
        openSnackbar={() => setSnackDeleteOpen(true)}
      />
      <Snackbar
        open={snackDeleteOpen}
        autoHideDuration={3000}
        onClose={() => setSnackDeleteOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackDeleteOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Запись удалена
        </Alert>
      </Snackbar>
    </Container>
  );
});
