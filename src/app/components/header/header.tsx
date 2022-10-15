import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Container } from '../container/container';
import { HOME_PAGE_PATH } from 'app/router';
import { stringToColor, useThemeStore } from 'app/shared/utils';
import { useRootStore } from 'app/stores';
import { MenuComponent } from './components';
import { styled, Switch, useTheme } from '@mui/material';
import { amber } from '@mui/material/colors';

export const Header = observer((): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const {
    authStore: { userData, authState, logOut },
  } = useRootStore();
  const { theme, mode, toggleColorMode } = useThemeStore();
  const muiTheme = useTheme();

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    logOut();
  };

  const handleSwitchChange = (): void => {
    if (toggleColorMode) {
      toggleColorMode();
    }
  };

  const MUISwitch = styled(Switch)(() => ({
    width: 55,
    height: 34,
    padding: 7,
    alignItems: 'center',
    '& .MuiSwitch-switchBase': {
      top: 2,
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb': {
          backgroundColor: muiTheme.palette.grey[800],
        },
        '& .MuiSwitch-thumb:before': {
          filter:
            'brightness(0) saturate(100%) invert(81%) sepia(63%) saturate(2409%) hue-rotate(357deg) brightness(98%) contrast(113%)',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: muiTheme.palette.grey[400],
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: amber[600],
      width: 28,
      height: 28,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      height: '15px',
      opacity: 1,
      backgroundColor: muiTheme.palette.grey[400],
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Box
      component="header"
      sx={{
        zIndex: 10,
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        minHeight: '60px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
        background: theme && theme.palette.background.default,
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          component={NavLink}
          to={HOME_PAGE_PATH}
          sx={{
            textDecoration: 'none',
            marginRight: 'auto',
            color: 'inherit',
          }}
        >
          <Typography
            variant="h6"
            sx={{ letterSpacing: '0.1rem', fontWeight: '700' }}
            color="inherit"
          >
            FeelsLike
          </Typography>
        </Link>
        <MUISwitch
          checked={mode === 'dark'}
          onChange={handleSwitchChange}
          sx={{ mx: 1 }}
        />
        {authState === 'Authorized' && userData ? (
          <>
            <IconButton
              onClick={handleMenuOpenClick}
              aria-controls={menuOpen ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: stringToColor(userData.email),
                  fontSize: 18,
                }}
                src={userData.profileImage}
              />
            </IconButton>
            <MenuComponent
              anchorEl={anchorEl}
              close={handleMenuClose}
              signOut={handleLogout}
              isOpen={menuOpen}
            />
          </>
        ) : null}
      </Container>
    </Box>
  );
});
