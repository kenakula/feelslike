import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { NoteType } from 'app/shared/types';
import { noteTypesOptions } from 'app/shared';
import { OrderByDirection } from 'firebase/firestore';
import { useRootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-start',
  },
  '& .MuiPaper-root': {
    width: '100%',
  },
}));

interface Props {
  openState: boolean;
  handleClose: () => void;
}

export const FilterComponent = observer(
  ({ openState, handleClose }: Props): JSX.Element => {
    const {
      notesStore: { journalFilter, setJournalFilter, filterJournalNotes },
      authStore: { userId },
    } = useRootStore();

    const handleTypeChange = (event: SelectChangeEvent): void => {
      const type = event.target.value as NoteType;
      setJournalFilter({ type });
    };

    const handleOrderChange = (event: SelectChangeEvent): void => {
      const order = event.target.value as OrderByDirection;
      setJournalFilter({ order });
    };

    const applyFilter = (): void => {
      filterJournalNotes(userId);
      handleClose();
    };

    return (
      <BootstrapDialog
        open={openState}
        onClose={handleClose}
        sx={{ alignItems: 'flex-start' }}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-type">Выберите тип</InputLabel>
            <Select
              labelId="select-type"
              value={journalFilter.type}
              label="Выберите тип"
              onChange={handleTypeChange}
              size="small"
            >
              <MenuItem key="all" value="all">
                Все записи
              </MenuItem>
              {noteTypesOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-sort">Сначала</InputLabel>
            <Select
              labelId="select-sort"
              value={journalFilter.order}
              label="Сначала"
              onChange={handleOrderChange}
              size="small"
            >
              <MenuItem key="desc" value="desc">
                Свежее
              </MenuItem>
              <MenuItem key="asc" value="asc">
                Старое
              </MenuItem>
            </Select>
          </FormControl>
          <Button onClick={applyFilter} fullWidth variant="outlined">
            Применить
          </Button>
        </DialogContent>
      </BootstrapDialog>
    );
  },
);
