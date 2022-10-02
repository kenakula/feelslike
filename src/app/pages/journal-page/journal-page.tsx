import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import { Container, Note, PageHeading } from 'app/components';
import { NoteModel } from 'app/models';
import { FilterParams, FilterType, SortOrder } from 'app/types';
import { filterNotes } from './assets';

export const JournalPage = observer((): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    type: 'all',
    sortOrder: 'desc',
  });
  const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);
  const menuOpen = Boolean(anchorEl);
  const {
    notesStore: { notes, getNotes, bootState },
    authStore: { userData },
  } = useRootStore();

  useEffect(() => {
    if (userData) {
      getNotes(userData.uid);
    }
  }, [userData, getNotes]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    const arr = filterNotes(notes, filterParams);
    setFilteredNotes(arr);
  }, [filterParams, notes]);

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleTypeChange = (event: SelectChangeEvent): void => {
    setFilterParams(prev => ({
      ...prev,
      type: event.target.value as FilterType,
    }));
    handleMenuClose();
  };

  const handleOrderChange = (event: SelectChangeEvent): void => {
    setFilterParams(prev => ({
      ...prev,
      sortOrder: event.target.value as SortOrder,
    }));
    handleMenuClose();
  };

  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Журнал">
        <IconButton onClick={handleMenuOpenClick} color="inherit">
          <TuneIcon />
        </IconButton>
      </PageHeading>
      {bootState === 'success' ? (
        <>
          <Stack spacing={2}>
            {filteredNotes.length ? (
              filteredNotes.map(note => <Note key={note.id} note={note} />)
            ) : (
              <Typography textAlign="center" variant="h5" component="p">
                У вас еще нет записей
              </Typography>
            )}
          </Stack>
          <Popover
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            sx={{ mt: 2, width: '100%' }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: '100%',
              },
            }}
          >
            <Box sx={{ p: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 2 }}>Тип записи:</Typography>
                <Select
                  value={filterParams.type}
                  onChange={handleTypeChange}
                  size="small"
                  sx={{ mb: 1 }}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="feel">Чувства</MenuItem>
                  <MenuItem value="regular">Обычные</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 2 }}>Сначала:</Typography>
                <Select
                  value={filterParams.sortOrder}
                  onChange={handleOrderChange}
                  size="small"
                >
                  <MenuItem value="asc">старые</MenuItem>
                  <MenuItem value="desc">свежие</MenuItem>
                </Select>
              </Box>
            </Box>
          </Popover>
        </>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: '150px', borderRadius: '8px', mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: '150px', borderRadius: '8px', mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: '150px', borderRadius: '8px', mb: 2 }}
          />
        </>
      )}
    </Container>
  );
});
