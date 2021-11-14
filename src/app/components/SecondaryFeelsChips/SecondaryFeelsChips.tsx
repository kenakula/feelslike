import { Chip } from '@mui/material';
import React from 'react';
import './SecondaryFeelsChips.scss';

interface FeelsProps {
  data: string | string[] | null;
}

const SecondaryFeelsChips = (props: FeelsProps) => {
  if (Array.isArray(props.data)) {
    return (
      <>
        {props.data.map((feel: string) => {
          return (
            <Chip
              className="secondary-feels-chips"
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
      <Chip className="secondary-feels-chips" label={props.data} size="small" />
    );
  }
};

export default SecondaryFeelsChips;
