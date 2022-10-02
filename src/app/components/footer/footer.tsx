import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react-lite';
import { LinkComponent } from './link-component';
import { Container } from '../container/container';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { HOME_PAGE_PATH, JOURNAL_PAGE_PATH } from 'app/router';
import { useRootStore } from 'app/stores';
import { NoteType } from 'app/types/note-types';
import { DrawerComponent } from './drawer-component';

export const Footer = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const {
    authStore: { authState },
    notesStore: { bootState, setModalState, setEditorType },
  } = useRootStore();
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = (type: NoteType): void => {
    setModalState(true);
    setEditorType(type);
  };

  return (
    <Box
      position="fixed"
      component="footer"
      sx={{
        zIndex: 10,
        bottom: 0,
        left: 0,
        top: 'auto',
        width: '100%',
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        background: theme.palette.background.default,
      }}
    >
      {authState === 'Authorized' && (
        <Container>
          <Box
            component="nav"
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: '70px',
              display: 'flex',
              alignItems: 'center',
              a: {
                mr: 6,
              },
            }}
          >
            <LinkComponent
              path={HOME_PAGE_PATH}
              icon={<HomeIcon />}
              label="Главная страница"
            />
            <LinkComponent
              path={JOURNAL_PAGE_PATH}
              icon={<LibraryBooksIcon />}
              label="Журнал"
            />
            <Fab
              color="primary"
              aria-label="add"
              size="large"
              onClick={handleMenuOpenClick}
              sx={{
                position: 'absolute',
                right: 10,
                top: '-50%',
                width: 70,
                height: 70,
              }}
              disabled={bootState !== 'success'}
            >
              <AddIcon fontSize="large" />
            </Fab>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={menuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: '-100px',
              },
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem
              dense
              color="primary"
              onClick={() => handleDrawerOpen('feel')}
            >
              <Typography variant="body1" noWrap>
                Чувство
              </Typography>
            </MenuItem>
            <MenuItem dense onClick={() => handleDrawerOpen('regular')}>
              <Typography variant="body1">Запись</Typography>
            </MenuItem>
          </Menu>
          <DrawerComponent />
        </Container>
      )}
    </Box>
  );
});
