import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import { ReactComponent as JoyImage } from 'assets/img/joyride.svg';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Container,
  Loader,
  NoteDetails,
  NothingFound,
  PageHeading,
} from 'app/components';
import { NoteModel } from 'app/models';
import { FilterComponent, NotesList, PageSkeleton } from './components';

export const JournalPage = observer((): JSX.Element => {
  const [selectedNote, setSelectedNote] = useState<NoteModel | null>(null);
  const [snackDeleteOpen, setSnackDeleteOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    notesStore: {
      notes,
      bootState,
      getNotesFirstBatch,
      getNotesNextBatch,
      hasMoreNotes,
    },
    authStore: { userData },
  } = useRootStore();

  useEffect(() => {
    if (userData) {
      getNotesFirstBatch(userData.uid);
    }
  }, [userData, getNotesFirstBatch]);

  const handleFilterOpen = (): void => {
    setFilterOpen(true);
  };

  const handleFilterClose = (): void => {
    setFilterOpen(false);
  };

  const selectNote = (note: NoteModel): void => {
    setSelectedNote(note);
    setDetailsOpen(true);
  };

  const onLoadMore = (): void => {
    if (userData) {
      getNotesNextBatch(userData.uid);
    }
  };

  return (
    <Container sx={{ pt: 5 }}>
      {bootState === 'success' ? (
        <>
          <PageHeading title="Журнал">
            <IconButton onClick={handleFilterOpen} color="primary">
              <TuneIcon />
            </IconButton>
          </PageHeading>
          {notes.length ? (
            <InfiniteScroll
              hasMore={hasMoreNotes}
              dataLength={notes.length}
              next={onLoadMore}
              loader={
                <Box sx={{ position: 'relative', height: 50 }}>
                  <Loader />
                </Box>
              }
              scrollableTarget="scrollableContainer"
              endMessage={
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '150px',
                    margin: '0 auto',
                    svg: {
                      maxWidth: '100%',
                      height: 'auto',
                    },
                  }}
                >
                  <JoyImage />
                </Box>
              }
            >
              <NotesList notes={notes} selectNote={selectNote} />
            </InfiniteScroll>
          ) : (
            <NothingFound />
          )}
        </>
      ) : (
        <PageSkeleton />
      )}
      <FilterComponent openState={filterOpen} handleClose={handleFilterClose} />
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
