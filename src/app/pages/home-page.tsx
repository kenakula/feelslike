import React, { useState } from 'react';
import { Container } from 'app/components/container/container';
import { ReactComponent as SvgImage1 } from 'assets/img/mindfull.svg';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  DASHBOARD_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from 'app/routes';

export const HomePage = (): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 4 }}>
        <Typography sx={{ alignSelf: 'flex-start' }}>
          <strong>Easy</strong> to use
        </Typography>
        <Typography sx={{ alignSelf: 'center' }}>
          <strong>Perfect</strong> to observe
        </Typography>
        <Typography sx={{ alignSelf: 'flex-end' }}>
          <strong>Helpful</strong> to mind
        </Typography>
      </Box>
      <Box
        sx={{ maxWidth: '100%', '& svg': { width: '100%', height: 'auto' } }}
      >
        <SvgImage1 />
      </Box>
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" textAlign="center">
          Try now and <strong>feel</strong> it
        </Typography>
        {!isSignedIn && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 3,
            }}
          >
            <Button
              component={NavLink}
              to={SIGNIN_PAGE_PATH}
              variant="outlined"
            >
              Sign In
            </Button>
            <Typography variant="caption" sx={{ px: 2 }}>
              or
            </Typography>
            <Button
              component={NavLink}
              to={SIGNUP_PAGE_PATH}
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        {isSignedIn && (
          <Button
            component={NavLink}
            to={DASHBOARD_PAGE_PATH}
            sx={{ margin: '0 auto', display: 'flex' }}
          >
            Go to Feels
          </Button>
        )}
      </Box>
    </Container>
  );
};
