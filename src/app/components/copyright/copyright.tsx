import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://feelslike.ru">
        FeelsLike
      </Link>{' '}
      {/* TODO change when deploy */}
      {new Date().getFullYear()}
    </Typography>
  );
};
