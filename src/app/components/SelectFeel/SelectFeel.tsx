import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { SecondaryFeel } from "app/constants/types/secondaryFeel";
import { MainPageStoreContext } from "app/stores/main-page/mainPageStore";
import { observer } from "mobx-react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./SelectFeel.scss";

interface Props {
  changeHandler: Dispatch<SetStateAction<string>>;
  fieldValue: string;
}

const SelectFeel = observer((props: Props) => {
  const { changeHandler, fieldValue } = props;

  const mainPageStore = useContext(MainPageStoreContext);

  const [primaryFeel, setPrimaryFeel] = useState<string | undefined>("");
  const [feelsList, setFeelsList] = useState<string[] | undefined>([]);
  const [secondaryFeel, setSecondaryFeel] = useState<string | undefined>("");

  useEffect(() => {
    const feelObj = mainPageStore?.secondaryFeels.filter(
      (item: SecondaryFeel) => {
        return item.id === primaryFeel;
      }
    );

    if (feelObj?.length) {
      setFeelsList(feelObj[0].list);
    }
  }, [primaryFeel, mainPageStore]);

  const composeFeelText = (str: string) => {
    if (!fieldValue.length) {
      changeHandler(`${primaryFeel}: ${str}`);
    } else {
      changeHandler(`${fieldValue}, ${str}`);
    }
  };

  const handlePrimaryChange = (evt: SelectChangeEvent) => {
    setPrimaryFeel(evt.target.value);
    setSecondaryFeel("");
    changeHandler("");
  };

  const handleSecondaryChange = (evt: SelectChangeEvent) => {
    setSecondaryFeel(evt.target.value);
    composeFeelText(evt.target.value);
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
            labelId="select-secondary-label"
            id="select-secondary"
            value={secondaryFeel}
            label="Точнее"
            onChange={handleSecondaryChange}
          >
            {feelsList.map((item: string) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
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
