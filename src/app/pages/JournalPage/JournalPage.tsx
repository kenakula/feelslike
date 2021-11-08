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

const Layout = React.lazy(() => import('../../containers/layout/layout'));

const JournalPage = observer(() => {
  const journalStore = useContext(JournalStoreContext);
  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    journalStore?.init();
    journalStore?.fetchNotes(currentUser);
  }, [journalStore, currentUser]);

  return (
    <Layout>
      {journalStore?.isInited ? (
        <Container>
          {journalStore?.notesList.length ? (
            <List>
              {journalStore.notesList.map((note: Note) => {
                return (
                  <JournalItem
                    key={nanoid()}
                    data={note}
                    modalOpen={handleModalOpen}
                  />
                );
              })}
            </List>
          ) : null}
        </Container>
      ) : (
        <ThreeBounce />
      )}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={showModal}
        onClose={handleModalClose}
      >
        <DialogTitle>Note Details</DialogTitle>
      </Dialog>
    </Layout>
  );
});

export default JournalPage;
