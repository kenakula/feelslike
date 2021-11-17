import React, { useState } from 'react';
import Container from '../Container/Container';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Button,
  Link,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { OpenState } from 'app/constants/open-state';
import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import { useAuth } from 'app/stores/auth/auth-provider';
import { useHistory } from 'react-router-dom';
import { Routes } from 'app/routes/routes';

const Header = observer(() => {
  const [showDrawer, setShowDrawer] = useState<OpenState>(OpenState.Closed);
  const [errorMessage, setErrorMessage] = useState('');
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const signOutHandler = async () => {
    try {
      setErrorMessage('');
      await logout();
      history.push('/login');
    } catch (err) {
      console.log(err);
      setErrorMessage('Ошибка выхода');
    }
  };

  const toggleDrawer = () => {
    switch (showDrawer) {
      case OpenState.Opened:
        setShowDrawer(OpenState.Closed);
        break;
      case OpenState.Closed:
        setShowDrawer(OpenState.Opened);
        break;
      default:
        break;
    }
  };

  return (
    <header className="header">
      <Container className="header__container">
        <NavLink className="header__logo" to={Routes.DEFAULT}>
          <Link component="span" underline="none" variant="h5">
            FeelsLike
          </Link>
        </NavLink>
        <Stack
          sx={{ marginLeft: 'auto' }}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <NavLink
            className="header__link"
            to={Routes.JOURNAL}
            activeClassName="header__link--active"
          >
            <Button variant="contained" size="small" LinkComponent="span">
              Journal
            </Button>
          </NavLink>
          <button className="header__menu-btn" onClick={toggleDrawer}>
            {currentUser?.displayName ? (
              <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }}>
                {currentUser.displayName[0]}
              </Avatar>
            ) : (
              <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }} />
            )}
          </button>
        </Stack>
        <SwipeableDrawer
          anchor="right"
          open={showDrawer === OpenState.Opened}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <Box className="header__drawer">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography className="header__username" variant="body1">
                <NavLink to={Routes.EDIT_INFO}>
                  <Button component="span" color="primary" variant="text">
                    {currentUser?.displayName}
                  </Button>
                </NavLink>
              </Typography>
              <NavLink to={Routes.EDIT_INFO}>
                {currentUser?.displayName ? (
                  <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }}>
                    {currentUser.displayName[0]}
                  </Avatar>
                ) : (
                  <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }} />
                )}
              </NavLink>
            </Stack>
            <Button
              color="error"
              fullWidth
              variant="contained"
              sx={{ marginTop: 'auto' }}
              onClick={signOutHandler}
            >
              SignOut
            </Button>
            {errorMessage ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            ) : null}
          </Box>
        </SwipeableDrawer>
      </Container>
    </header>
  );
});

export default Header;
