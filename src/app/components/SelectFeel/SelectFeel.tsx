import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Box } from '@mui/system';
// import { feelsItems } from 'app/constants/feels';
import { SecondaryFeel } from 'app/constants/types/secondaryFeel';
import { MainPageStoreContext } from 'app/stores/main-page/mainPageStore';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import './SelectFeel.scss';

const SelectFeel = observer(() => {
  const mainPageStore = useContext(MainPageStoreContext);

  const [primaryFeel, setPrimaryFeel] = useState<string | undefined>('');
  const [feelsList, setFeelsList] = useState<string[] | undefined>([]);
  const [selectedFeels, setSelectedFeels] = useState<string[]>([]);

  const handleSecondaryChange = (
    event: SelectChangeEvent<typeof selectedFeels>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedFeels(typeof value === 'string' ? value.split(',') : value);
    mainPageStore?.setSecondaryFeels(value);
  };

  useEffect(() => {
    const feelObj = mainPageStore?.secondaryFeels.filter(
      (item: SecondaryFeel) => {
        return item.id === primaryFeel;
      },
    );

    if (feelObj?.length) {
      setFeelsList(feelObj[0].list);
    }
  }, [primaryFeel, mainPageStore]);

  const handlePrimaryChange = (evt: SelectChangeEvent) => {
    setPrimaryFeel(evt.target.value);
    mainPageStore?.setPrimaryFeel(evt.target.value);
    setSelectedFeels([]);
  };

  return (
    <Box className="select-feel">
      {mainPageStore?.primaryFeels && mainPageStore?.secondaryFeels ? (
        <>
          <FormControl className="select-feel__primary" fullWidth>
            <InputLabel id="select-primary-label">Чувство</InputLabel>
            <Select
              labelId="select-primary-label"
              id="select-primary"
              value={primaryFeel}
              label="Чувство"
              onChange={handlePrimaryChange}
            >
              {mainPageStore.primaryFeels.map((item: string) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>выберите одно</FormHelperText>
          </FormControl>
        </>
      ) : null}
      {feelsList ? (
        <FormControl
          className="select-feel__secondary"
          disabled={primaryFeel?.length ? false : true}
          fullWidth
        >
          <InputLabel id="select-secondary-label">Точнее</InputLabel>
          <Select
            multiple
            labelId="select-secondary-label"
            id="select-secondary"
            value={selectedFeels}
            label="Точнее"
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            onChange={handleSecondaryChange}
            renderValue={selected => selected.join(', ')}
          >
            {feelsList.map((item: string) => {
              return (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={selectedFeels.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>можно несколько</FormHelperText>
        </FormControl>
      ) : null}
    </Box>
  );
});

export default SelectFeel;
