import React, { useEffect, useState } from 'react';
import { Container, Note, PageHeading } from 'app/components';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Calendar, {
  CalendarTileProperties,
  ViewCallbackProperties,
} from 'react-calendar';
import Box from '@mui/material/Box';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { compareDates, filterNotes } from './assets';
import { Skeleton, Typography } from '@mui/material';
import { useRootStore } from 'app/stores';

export const HomePage = observer((): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date());

  const {
    notesStore: { notes, bootState, editorNoteDate, setEditorDate, getNotes },
    authStore: { userData },
  } = useRootStore();

  const onResetClick = (): void => {
    setEditorDate(new Date());
    setStartDate(new Date());
  };

  const onActiveStartDateChange = ({
    activeStartDate,
  }: ViewCallbackProperties): void => {
    setStartDate(activeStartDate);
  };

  useEffect(() => {
    if (userData) {
      getNotes(userData.uid);
    }
  }, [userData, getNotes]);

  return (
    <Container sx={{ pt: 5 }}>
      <h1 className="visually-hidden">Главная страница</h1>
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
        {bootState === 'success' ? (
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
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: '336px', borderRadius: '8px' }}
          />
        )}
      </Box>
      {bootState === 'success' ? (
        <Box>
          <PageHeading
            title={`Записи ${editorNoteDate.toLocaleDateString()}`}
            component="h2"
          />
          <Stack spacing={2} sx={{ mb: 2 }}>
            {filterNotes(notes, editorNoteDate).length ? (
              filterNotes(notes, editorNoteDate).map(note => (
                <Note key={note.id} note={note} />
              ))
            ) : (
              <Typography variant="h6" component="p" textAlign="center">
                В этот день не было записей
              </Typography>
            )}
          </Stack>
        </Box>
      ) : (
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '47px',
              borderRadius: '0 8px 8px 0',
              mb: 5,
              marginLeft: '-16px',
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '150px',
              borderRadius: '8px',
            }}
          />
        </Box>
      )}
    </Container>
  );
});
