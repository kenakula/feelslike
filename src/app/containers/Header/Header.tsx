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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { OpenState } from 'app/constants/open-state';
import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import { useAuth } from 'app/stores/auth/auth-provider';
import { useHistory } from 'react-router-dom';

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
        <NavLink className="header__logo" to="/">
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
            to="/journal"
            activeClassName="header__link--active"
          >
            <Button variant="contained" size="small" LinkComponent="span">
              Journal
            </Button>
          </NavLink>
          <button className="header__menu-btn" onClick={toggleDrawer}>
            <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }}>
              <PersonOutlinedIcon />
            </Avatar>
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
              sx={{ mb: 2, pl: 2 }}
            >
              <Typography className="header__username" variant="body1">
                {currentUser?.displayName}
              </Typography>
              <Avatar variant="circular" sx={{ bgcolor: '#1d3557' }}>
                <PersonOutlinedIcon />
              </Avatar>
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
