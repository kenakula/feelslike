import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';
import { ReactComponent as NothingFoundImage } from 'assets/img/nothing-found-image.svg';

interface Props {
  noImage?: boolean;
  title?: string;
  style?: SxProps;
}

export const NothingFound = ({
  title = 'Добавьте записи, пока ничего нет',
  style,
  noImage = false,
}: Props): JSX.Element => {
  return (
    <Box>
      {noImage ? null : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '150px',
            margin: '0 auto 20px',
            svg: {
              maxWidth: '100%',
              height: 'auto',
            },
          }}
        >
          <NothingFoundImage />
        </Box>
      )}
      <Typography
        textAlign="center"
        variant="h5"
        component="p"
        sx={style ?? undefined}
      >
        {title}
      </Typography>
    </Box>
  );
};
