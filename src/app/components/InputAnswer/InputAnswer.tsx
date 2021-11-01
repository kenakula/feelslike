import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SelectFeel from "../SelectFeel/SelectFeel";
import "./InputAnswer.scss";

interface InputAnswerProps {
  hasFeels?: boolean;
}

const InputAnswer = (props: InputAnswerProps) => {
  const [value, setValue] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCloseSnackBar = () => {
    setShowSnackBar(false);
  };

  const saveHandle = () => {
    if (value.length) {
      setShowSnackBar(true);
    }
    setValue("");
  };

  return (
    <Box className="input-answer">
      {props.hasFeels ? (
        <SelectFeel changeHandler={setValue} fieldValue={value} />
      ) : null}
      <TextField
        className="input-answer__field"
        multiline
        maxRows={6}
        value={value}
        onChange={handleChange}
        label="Введите текст"
        autoComplete="off"
      />
      <Button size="small" variant="contained" onClick={saveHandle}>
        Сохранить
      </Button>
      <Snackbar
        open={showSnackBar}
        onClose={handleCloseSnackBar}
        autoHideDuration={2000}
        message="Запись добавлена"
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Запись добавлена
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InputAnswer;
