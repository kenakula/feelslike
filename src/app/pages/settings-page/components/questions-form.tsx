import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { observer } from 'mobx-react-lite';
import { QuestionsModel } from 'app/models';
import { SnackBarStateProps } from 'app/shared/types';
import { useRootStore } from 'app/stores';

interface Props {
  questions: string[];
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackBarStateProps>>;
  setError: (message: string) => void;
}

export const QuestionsForm = observer(
  ({ questions, setSnackbarState }: Props): JSX.Element => {
    const [list, setList] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const {
      authStore: { updateUserInfo },
    } = useRootStore();

    useEffect(() => {
      if (questions.length) {
        setList(questions);
      }
    }, [questions]);

    const handleQuestionChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      setNewQuestion(event.target.value);
    };

    const updateQuestions = (arr: string[], deleted = false): void => {
      const model = { list: arr } as QuestionsModel;
      setProcessing(true);

      updateUserInfo({ questions: model.list })
        .then(() => {
          setProcessing(false);
          setSnackbarState(prev => ({
            ...prev,
            message: deleted ? 'Вопрос удален' : 'Вопрос добавлен',
            isOpen: true,
            alert: deleted ? 'warning' : 'success',
          }));
        })
        .catch(() => {
          setProcessing(false);
          setSnackbarState(prev => ({
            ...prev,
            message: 'Ошибка',
            isOpen: true,
            alert: 'error',
          }));
        });
    };

    const deleteQuestion = (question: string): void => {
      const newArr = list.filter(item => item !== question);
      setList(newArr);
      updateQuestions(newArr, true);
    };

    const addQuestion = (): void => {
      const newArr = list.concat(newQuestion);
      setList(newArr);
      setNewQuestion('');
      updateQuestions(newArr);
    };

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
        <Typography
          sx={{ mb: 1, display: 'block', width: '100%' }}
          variant="h6"
        >
          Измените список вопросов:
        </Typography>
        <List
          dense
          sx={{
            width: '100%',
            opacity: processing ? 0.5 : 1,
          }}
        >
          {list.length ? (
            list.map(item => (
              <ListItem
                key={item}
                secondaryAction={
                  list.length > 1 && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => deleteQuestion(item)}
                      disabled={processing}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <QuestionMarkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item} />
              </ListItem>
            ))
          ) : (
            <Skeleton sx={{ width: '100%', height: 250 }} />
          )}
        </List>
        <Box
          sx={{ display: 'flex', alignItems: 'center', width: '100%', pt: 2 }}
        >
          <IconButton color="primary" onClick={addQuestion}>
            <AddIcon fontSize="large" />
          </IconButton>
          <TextField
            size="small"
            onChange={handleQuestionChange}
            value={newQuestion}
            sx={{ width: '100%', ml: 1 }}
          />
        </Box>
      </Box>
    );
  },
);
