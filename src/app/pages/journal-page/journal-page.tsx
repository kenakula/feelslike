import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import { Container, Note, PageHeading } from 'app/components';
import { noteMocks } from 'app/stores/mocks/notes-mock';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type FilterType = 'feel' | 'regular' | 'all';
type SortOrder = 'asc' | 'desc';

interface FilterParams {
  type: FilterType;
  sortOrder: SortOrder;
}

export const JournalPage = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    type: 'all',
    sortOrder: 'desc',
  });
  const menuOpen = Boolean(anchorEl);

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
  };

  const handleOrderChange = (event: SelectChangeEvent): void => {
    setFilterParams(prev => ({
      ...prev,
      sortOrder: event.target.value as SortOrder,
    }));
  };

  return (
    <Container sx={{ pt: 5 }}>
      <PageHeading title="Журнал">
        <IconButton onClick={handleMenuOpenClick} color="inherit">
          <TuneIcon />
        </IconButton>
      </PageHeading>
      <Stack spacing={2}>
        {noteMocks.map(note => (
          <Note key={note.id} note={note} />
        ))}
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
    </Container>
  );
};
