import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { MapAuthErrorCodes } from './assets';

interface Props {
  code: string;
}

export const AuthError = ({ code }: Props): JSX.Element => {
  const getMessage = (): string => {
    return MapAuthErrorCodes[code] ?? `Ошибка, попробуйте позже. ${code}`;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="error">{getMessage()}</Alert>
    </Box>
  );
};
