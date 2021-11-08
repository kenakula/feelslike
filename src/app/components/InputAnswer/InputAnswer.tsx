import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Question } from 'app/constants/types/questions';
import { MainPageStoreContext } from 'app/stores/main-page/mainPageStore';
import React, { useContext, useState } from 'react';
import SelectFeel from '../SelectFeel/SelectFeel';
import './InputAnswer.scss';

interface InputAnswerProps {
  hasFeels?: boolean;
  question: Question;
}

const InputAnswer = (props: InputAnswerProps) => {
  const [value, setValue] = useState('');

  const mainPageStore = useContext(MainPageStoreContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    mainPageStore?.pushAnswer({
      question: props.question.text,
      answer: evt.target.value,
    });
  };

  return (
    <Box className="input-answer">
      {props.hasFeels ? <SelectFeel /> : null}
      <TextField
        className="input-answer__field"
        multiline
        maxRows={6}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Опишите подробнее"
        autoComplete="off"
      />
    </Box>
  );
};

export default InputAnswer;
