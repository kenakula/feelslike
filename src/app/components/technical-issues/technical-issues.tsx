import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ErrorIcon from '@mui/icons-material/Error';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const PaperElement = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  position: 'absolute',
  left: '50%',
  top: '50%',
  padding: '40px 10px 30px 10px',
  width: '320px',
  transform: 'translate(-50%, -50%)',
  '& .MuiSvgIcon-root': {
    position: 'absolute',
    left: '50%',
    top: '-85px',
    transform: 'translateX(-50%)',
    fontSize: '90px',
    color: red[500],
  },
}));

interface Props {
  code?: string | null;
  header?: string;
  message?: string;
}

export const TechnicalIssues = (props: Props): JSX.Element => {
  const {
    code = '',
    header = 'Произошла ошибка',
    message = 'Попробуйте позже',
  } = props;

  return (
    <PaperElement elevation={3}>
      <Stack spacing={1} alignItems="center" sx={{ position: 'relative' }}>
        <ErrorIcon />
        {code && code.length ? (
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {code}
          </Typography>
        ) : null}
        <Typography variant="body1" component="h1" textAlign="center">
          {header}
        </Typography>
        {message ? (
          <Typography variant="caption" textAlign="center">
            {message}
          </Typography>
        ) : null}
      </Stack>
    </PaperElement>
  );
};
