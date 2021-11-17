import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { BootState } from 'app/constants/boot-state';
import ThreeBounce from 'app/components/ThreeBounce/ThreeBounce';
import { MainPageStoreContext } from 'app/stores/main-page/mainPageStore';
import { Question } from 'app/constants/types/questions';
import Container from 'app/containers/Container/Container';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import InputAnswer from 'app/components/InputAnswer/InputAnswer';
import { useAuth } from 'app/stores/auth/auth-provider';

const Layout = React.lazy(() => import('app/containers/layout/layout'));

const MainPage = observer((): JSX.Element => {
  const mainPageStore = useContext(MainPageStoreContext);
  const { currentUser } = useAuth();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [showSaveNote, setShowSaveNote] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [clearState, setClearState] = useState(false);

  const handleChange =
    (panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  const handleSaveBtn = () => {
    mainPageStore?.makeNote();

    if (currentUser && mainPageStore?.note) {
      mainPageStore?.saveNoteToDatabase(currentUser, setShowSaveNote);
      setClearState(true);
      mainPageStore.selectedPrimaryFeel = null;
      mainPageStore.selectedSecondaryFeels = null;

      setTimeout(() => {
        setClearState(false);
      }, 500);
    } else {
      console.log('error');
    }
  };

  const handleCloseBackDrop = () => {
    setShowSaveNote(false);
  };

  switch (mainPageStore?.getBootState) {
    case BootState.Success:
      return (
        <Layout>
          <Container>
            {mainPageStore.questions.map(
              (question: Question, index: number) => {
                return (
                  <Accordion
                    key={question.id}
                    expanded={index === 0 ? true : expanded === question.id}
                    onChange={handleChange(question.id)}
                  >
                    <AccordionSummary
                      expandIcon={index === 0 ? null : <ExpandMoreRounded />}
                      aria-controls={`${question.id}-content`}
                      id={`${question.id}-header`}
                    >
                      <Typography>{question.text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <InputAnswer
                        clearState={clearState}
                        question={question}
                        hasFeels={index === 0}
                        setDisabled={setSaveDisabled}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              },
            )}
          </Container>
          <Button
            variant="contained"
            sx={{ margin: '20px auto 0 auto', display: 'block' }}
            onClick={handleSaveBtn}
            disabled={saveDisabled}
          >
            Сохранить
          </Button>
          <Backdrop open={showSaveNote} onClick={handleCloseBackDrop}>
            {mainPageStore.getNoteBootState === BootState.Loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Alert severity="success">Запись успешно сохранена</Alert>
            )}
          </Backdrop>
        </Layout>
      );
    default:
      return <ThreeBounce />;
  }
});

export default MainPage;
