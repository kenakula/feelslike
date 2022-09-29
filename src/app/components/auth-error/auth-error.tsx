import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { MapAuthErrorCodes } from './assets';

interface Props {
  message: string;
}

export const AuthError = ({ message }: Props): JSX.Element => {
  const getMessage = (): string => {
    return MapAuthErrorCodes[message] ?? `Ошибка, попробуйте позже. ${message}`;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="error">{getMessage()}</Alert>
    </Box>
  );
};
