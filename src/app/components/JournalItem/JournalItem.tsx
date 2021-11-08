import { Avatar, Chip, Paper, Typography } from '@mui/material';
import { Note } from 'app/constants/types/note';
import { getDate, getTime } from 'app/utils/timeHelpers';
import React, { useState } from 'react';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import './JournalItem.scss';

interface Props {
  data: Note;
  modalOpen: () => void;
}

interface FeelsProps {
  data: string | string[];
}

const SecondaryFeels = (props: FeelsProps) => {
  if (Array.isArray(props.data)) {
    return (
      <>
        {props.data.map((feel: string) => {
          return (
            <Chip
              className="journal-item__secondary-feel"
              key={feel}
              label={feel}
              size="small"
            />
          );
        })}
      </>
    );
  } else {
    return (
      <Chip
        className="journal-item__secondary-feel"
        label={props.data}
        size="small"
      />
    );
  }
};

const JournalItem = (props: Props) => {
  const { data } = props;

  const [hoverElevation, setHoverElevation] = useState(3);

  const onItemMouseOver = () => {
    setHoverElevation(5);
  };

  const onItemMouseOut = () => {
    setHoverElevation(3);
  };

  return (
    <Paper
      elevation={hoverElevation}
      className="journal-item"
      onMouseOver={onItemMouseOver}
      onMouseOut={onItemMouseOut}
      onClick={props.modalOpen}
    >
      <div className="journal-item__top">
        <Typography className="journal-item__date">
          {getDate(data.date)}
        </Typography>
      </div>
      <div className="journal-item__body">
        <div className="journal-item__time">
          <Typography className="journal-item__time">
            {getTime(data.date)}
          </Typography>
        </div>
        <div className="journal-item__info">
          <Avatar className="journal-item__icon">
            <AssignmentLateOutlinedIcon />
          </Avatar>
          <Typography
            className="journal-item__feel"
            variant="h6"
            component="p"
          >{`${data.primaryFeel}:`}</Typography>
          <div className="journal-item__feels-list">
            {data.secondaryFeels && (
              <SecondaryFeels data={data.secondaryFeels} />
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default JournalItem;
