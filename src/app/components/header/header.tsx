import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Container } from '../container/container';
import { HOME_PAGE_PATH } from 'app/router';
import { stringToColor } from 'app/shared/utils';
import { useRootStore } from 'app/stores';
import { MenuComponent } from './components';

export const Header = observer((): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const {
    authStore: { userData, authState, logOut },
  } = useRootStore();
  const theme = useTheme();

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    logOut();
  };

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
        boxShadow: theme.shadows[4],
        background: theme.palette.background.default,
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
            sx={{ letterSpacing: '0.07rem' }}
            color="inherit"
          >
            FeelsLike
          </Typography>
        </Link>
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
                  backgroundColor: stringToColor(userData.displayName),
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
