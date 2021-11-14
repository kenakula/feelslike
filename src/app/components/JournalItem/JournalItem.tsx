import { Avatar, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Note } from 'app/constants/types/note';
import { getDate, getTime } from 'app/utils/timeHelpers';
import React, { useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Icon, { getIconName } from 'app/components/Emotions';
import './JournalItem.scss';
import SecondaryFeelsChips from '../SecondaryFeelsChips/SecondaryFeelsChips';

interface Props {
  data: Note;
  modalDetailsOpen: (data: Note) => void;
  modalEditOpen: (data: Note) => void;
}

const JournalItem = (props: Props) => {
  const { data } = props;
  const iconName = getIconName(props.data.primaryFeel);

  const [hoverElevation, setHoverElevation] = useState(3);

  const onItemMouseOver = () => {
    setHoverElevation(5);
  };

  const onItemMouseOut = () => {
    setHoverElevation(3);
  };

  const onEditButtonClick = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    props.modalEditOpen(data);
  };

  return (
    <Paper
      elevation={hoverElevation}
      className="journal-item"
      onMouseOver={onItemMouseOver}
      onMouseOut={onItemMouseOut}
      onClick={() => props.modalDetailsOpen(data)}
    >
      <div className="journal-item__top">
        <Typography className="journal-item__date">
          {getDate(data.date)}
        </Typography>
        <Tooltip
          title="дополнить ответ"
          placement="left-start"
          disableTouchListener
        >
          <IconButton aria-label="дополнить" onClick={onEditButtonClick}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="journal-item__body">
        <div className="journal-item__time">
          <Typography className="journal-item__time">
            {getTime(data.date)}
          </Typography>
        </div>
        <div className="journal-item__info">
          <Avatar className="journal-item__icon">
            <Icon size="medium" name={iconName} />
          </Avatar>
          <Typography
            className="journal-item__feel"
            variant="h6"
            component="p"
          >{`${data.primaryFeel}:`}</Typography>
          <div className="journal-item__feels-list">
            {data.secondaryFeels && (
              <SecondaryFeelsChips data={data.secondaryFeels} />
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default JournalItem;
