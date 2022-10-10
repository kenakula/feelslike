import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { NavLink, useLocation } from 'react-router-dom';
import { PROFILE_PAGE_PATH, SETTINGS_PAGE_PATH } from 'app/router';

interface Props {
  anchorEl: HTMLElement | null;
  close: () => void;
  signOut: () => void;
  isOpen: boolean;
}

export const MenuComponent = ({
  anchorEl,
  close,
  signOut,
  isOpen,
}: Props): JSX.Element => {
  const [currentPath, setCurrentPath] = useState('/');
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isCurrentLink = (path: string): boolean => path === currentPath;

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isOpen}
      onClose={close}
      onClick={close}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 2.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 18,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem dense component={NavLink} to={PROFILE_PAGE_PATH}>
        <ListItemIcon>
          <AccessibilityNewIcon
            fontSize="small"
            color={isCurrentLink(PROFILE_PAGE_PATH) ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <Typography variant="body2" noWrap>
          Профиль
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem dense component={NavLink} to={SETTINGS_PAGE_PATH}>
        <ListItemIcon>
          <Settings
            fontSize="small"
            color={isCurrentLink(SETTINGS_PAGE_PATH) ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <Typography variant="body2">Настройки</Typography>
      </MenuItem>
      <MenuItem dense onClick={signOut}>
        <ListItemIcon>
          <Logout color="error" fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Выйти</Typography>
      </MenuItem>
    </Menu>
  );
};
