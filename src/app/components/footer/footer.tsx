import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {
  HOME_PAGE_PATH,
  JOURNAL_PAGE_PATH,
  STATISTICS_PAGE_PATH,
} from 'app/router';
import { useRootStore } from 'app/stores';
import { NoteType } from 'app/shared/types/note-types';
import { LinkComponent, NoteDrawer } from './components';
import { Container } from '../container/container';
import { useThemeStore } from 'app/shared/utils';

export const Footer = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { theme } = useThemeStore();
  const {
    authStore: { authState, bootState },
    notesStore: { setModalState, setEditorType },
  } = useRootStore();
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleNoteDrawerOpen = (type: NoteType): void => {
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
        borderTop: `1px solid ${theme && theme.palette.grey[300]}`,
        background: theme && theme.palette.background.default,
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
                '&:last-child': {
                  mr: 0,
                },
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
            <LinkComponent
              path={STATISTICS_PAGE_PATH}
              icon={<QueryStatsIcon />}
              label="Статистика"
            />
            <Fab
              color="primary"
              aria-label="add"
              size="large"
              onClick={handleMenuOpen}
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
            open={menuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              sx: {
                overflow: 'visible',
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
              onClick={() => handleNoteDrawerOpen('feel')}
            >
              <Typography variant="body1">Про чувства</Typography>
            </MenuItem>
            <MenuItem dense onClick={() => handleNoteDrawerOpen('regular')}>
              <Typography variant="body1">Запись дневника</Typography>
            </MenuItem>
            <MenuItem dense onClick={() => handleNoteDrawerOpen('quiz')}>
              <Typography variant="body1">Опрос</Typography>
            </MenuItem>
          </Menu>
          <NoteDrawer />
        </Container>
      )}
    </Box>
  );
});
