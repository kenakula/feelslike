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
  Snackbar,
  Alert,
} from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import InputAnswer from 'app/components/InputAnswer/InputAnswer';

const Layout = React.lazy(() => import('app/containers/layout/layout'));

const MainPage = observer((): JSX.Element => {
  const mainPageStore = useContext(MainPageStoreContext);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleChange =
    (panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  const handleSaveBtn = () => {
    setShowSnackBar(true);
  };

  const handleCloseSnackBar = () => {
    setShowSnackBar(false);
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
                      <InputAnswer hasFeels={index === 0} />
                    </AccordionDetails>
                  </Accordion>
                );
              },
            )}
          </Container>
          {mainPageStore.getQuestionsData.length ? (
            <Button
              variant="contained"
              sx={{ margin: '20px auto 0 auto', display: 'block' }}
              onClick={handleSaveBtn}
            >
              Сохранить
            </Button>
          ) : null}
          <Snackbar
            open={showSnackBar}
            onClose={handleCloseSnackBar}
            autoHideDuration={2000}
            message="Запись добавлена"
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="success"
              sx={{ width: '100%' }}
            >
              Запись добавлена
            </Alert>
          </Snackbar>
        </Layout>
      );
    default:
      return <ThreeBounce />;
  }
});

export default MainPage;
