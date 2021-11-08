import { Dialog, DialogTitle, List } from '@mui/material';
import Container from 'app/containers/Container/Container';
import { useAuth } from 'app/stores/auth/auth-provider';
import { JournalStoreContext } from 'app/stores/journal-page/JournalStore';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import JournalItem from 'app/components/JournalItem/JournalItem';
import ThreeBounce from 'app/components/ThreeBounce/ThreeBounce';
import { Note } from 'app/constants/types/note';
import { runInAction } from 'mobx';

const Layout = React.lazy(() => import('../../containers/layout/layout'));

const JournalPage = observer(() => {
  const journalStore = useContext(JournalStoreContext);
  const { currentUser } = useAuth();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalDetailsData, setModalDetailsData] = useState<Note | null>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalEditData, setModalEditData] = useState<Note | null>();

  const [sortedList, setSortedList] = useState<Note[]>([]);

  const handleModalDetailsClose = () => {
    setShowDetailsModal(false);
  };

  const handleModalDetailsOpen = (data: Note) => {
    setShowDetailsModal(true);
    setModalDetailsData(data);
  };

  const handleModalEditOpen = (data: Note) => {
    setShowEditModal(true);
    setModalEditData(data);
  };

  const handleModalEditClose = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    journalStore?.init();
    journalStore?.fetchNotes(currentUser);
  }, [journalStore, currentUser]);

  useEffect(() => {
    if (journalStore?.notesList.length) {
      runInAction(() => {
        const sorted = journalStore.notesList;
        sorted.sort((a: Note, b: Note) => {
          return a.date.seconds - b.date.seconds;
        });
        setSortedList(sorted);
      });
    }
  }, [journalStore?.notesList]);

  return (
    <Layout>
      {journalStore?.isInited ? (
        <Container>
          {journalStore?.notesList.length ? (
            <List>
              {sortedList.map((note: Note) => {
                return (
                  <JournalItem
                    key={nanoid()}
                    data={note}
                    modalDetailsOpen={handleModalDetailsOpen}
                    modalEditOpen={handleModalEditOpen}
                  />
                );
              })}
            </List>
          ) : null}
        </Container>
      ) : (
        <ThreeBounce />
      )}
      {modalDetailsData && (
        <Dialog
          maxWidth="sm"
          fullWidth
          open={showDetailsModal}
          onClose={handleModalDetailsClose}
        >
          <DialogTitle>{modalDetailsData.id}</DialogTitle>
        </Dialog>
      )}
      {modalEditData && (
        <Dialog
          maxWidth="sm"
          fullWidth
          open={showEditModal}
          onClose={handleModalEditClose}
        >
          <DialogTitle>{modalEditData.primaryFeel}</DialogTitle>
        </Dialog>
      )}
    </Layout>
  );
});

export default JournalPage;
