import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import React from 'react';
import Typography from '@mui/material/Typography';

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
}: Props): JSX.Element => (
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
    <MenuItem dense color="primary">
      <ListItemIcon>
        <AccessibilityNewIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="body2" noWrap>
        Профиль
      </Typography>
    </MenuItem>
    <Divider />
    <MenuItem dense>
      <ListItemIcon>
        <Settings fontSize="small" />
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
