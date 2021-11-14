import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Container from 'app/containers/Container/Container';
import { useAuth } from 'app/stores/auth/auth-provider';
import { JournalStoreContext } from 'app/stores/journal-page/JournalStore';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import JournalItem from 'app/components/JournalItem/JournalItem';
import ThreeBounce from 'app/components/ThreeBounce/ThreeBounce';
import { AddedNote, Note } from 'app/constants/types/note';
import { runInAction } from 'mobx';
import Icon, { getIconName } from 'app/components/Emotions';
import { Box } from '@mui/system';
import SecondaryFeelsChips from 'app/components/SecondaryFeelsChips/SecondaryFeelsChips';
import { getDate } from 'app/utils/timeHelpers';
import { Answer } from 'app/constants/types/answer';
import CloseIcon from '@mui/icons-material/Close';
import { Timestamp } from '@firebase/firestore';
import { getDocument } from 'app/utils/firebaseHelpers';

const Layout = React.lazy(() => import('../../containers/layout/layout'));

const JournalPage = observer(() => {
  const journalStore = useContext(JournalStoreContext);
  const { currentUser } = useAuth();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalDetailsData, setModalDetailsData] = useState<Note | null>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalEditData, setModalEditData] = useState<Note | null>();

  const [sortedList, setSortedList] = useState<Note[]>([]);
  const [iconName, setIconName] = useState<string>('');

  const [editFieldValue, setEditFieldValue] = useState('');

  const handleModalDetailsClose = () => {
    setShowDetailsModal(false);
  };

  const handleModalDetailsOpen = (data: Note) => {
    setShowDetailsModal(true);
    setModalDetailsData(data);

    getDocument(
      journalStore?.mainPageStore.database,
      `users/${currentUser}/journal`,
      data.id,
    );

    const iconName = getIconName(data.primaryFeel);
    setIconName(iconName);
  };

  const handleModalEditOpen = (data: Note) => {
    setShowEditModal(true);
    setModalEditData(data);
  };

  const handleModalEditClose = () => {
    setShowEditModal(false);
  };

  const handleEditFeildChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEditFieldValue(evt.target.value);
  };

  const handleAddNote = () => {
    // TODO add alert
    if (modalEditData) {
      const data: AddedNote = {
        date: Timestamp.now(),
        id: nanoid(),
        text: editFieldValue,
      };

      journalStore?.addCommentNote(
        currentUser,
        data,
        modalEditData.id,
        data.id,
      );
    }
    setShowEditModal(false);
    setEditFieldValue('');
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

  useEffect(() => {
    if (modalDetailsData) {
      journalStore?.fetchCommentNotes(currentUser, modalDetailsData.id);
    }
  }, [modalDetailsData, journalStore, currentUser]);

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
      {/* детальная информация */}
      {modalDetailsData && (
        <Dialog
          maxWidth="sm"
          fullWidth
          open={showDetailsModal}
          onClose={handleModalDetailsClose}
        >
          <DialogTitle>
            <Typography variant="body2">
              {getDate(modalDetailsData.date)}
            </Typography>
            <IconButton
              onClick={handleModalDetailsClose}
              sx={{ position: 'absolute', top: '5px', right: '5px' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              sx={{ pt: 2 }}
            >
              <Icon size="medium" name={iconName} />
              <Typography variant="h5" sx={{ ml: 2 }}>
                {modalDetailsData.primaryFeel}:
              </Typography>
              <Stack
                direction="row"
                sx={{ pt: 2, width: '100%' }}
                flexWrap="wrap"
              >
                <SecondaryFeelsChips data={modalDetailsData.secondaryFeels} />
              </Stack>
            </Box>
            <List>
              {modalDetailsData.answers.map((answer: Answer) => {
                return (
                  <ListItem key={answer.question}>
                    <ListItemText
                      primary={answer.question}
                      secondary={answer.answer}
                    />
                  </ListItem>
                );
              })}
            </List>
            {journalStore?.commentNotesList?.length ? (
              <>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="h6">Комментарии</Typography>
                <List>
                  {journalStore.commentNotesList.map((item: AddedNote) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={item.text}
                          secondary={getDate(item.date)}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      )}
      {/* добавление комментария */}
      {modalEditData && (
        <Dialog
          maxWidth="sm"
          fullWidth
          open={showEditModal}
          onClose={handleModalEditClose}
        >
          <DialogTitle>
            Добавьте комментарий
            <IconButton
              onClick={handleModalEditClose}
              sx={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              color="primary"
              multiline
              maxRows={7}
              onChange={handleEditFeildChange}
              value={editFieldValue}
              sx={{ my: 2 }}
            />
            <Button variant="outlined" onClick={handleAddNote}>
              Добавить
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
});

export default JournalPage;
