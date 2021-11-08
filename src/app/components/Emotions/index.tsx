/* eslint-disable @typescript-eslint/no-explicit-any */

import { SvgIcon } from '@mui/material';
import React from 'react';
import { FeelIconName, FeelNames } from 'app/constants/types/feelIconNames';

import IconAnger from './icons/icon-anger.svg';
import IconSadness from './icons/icon-sadness.svg';
import IconLove from './icons/icon-love.svg';
import IconFear from './icons/icon-fear.svg';
import IconCheer from './icons/icon-cheer.svg';

export interface IconProps {
  name: string;
  size: 'inherit' | 'large' | 'medium' | 'small';
}

const Icon = (props: IconProps): JSX.Element => {
  switch (props.name) {
    case 'anger':
      return (
        <SvgIcon
          fontSize={props.size}
          color="error"
          component={IconAnger}
          viewBox={'0 0 496 512'}
        />
      );
    case 'sadness':
      return (
        <SvgIcon
          fontSize={props.size}
          color="primary"
          component={IconSadness}
          viewBox={'0 0 496 512'}
        />
      );
    case 'love':
      return (
        <SvgIcon
          fontSize={props.size}
          color="success"
          component={IconLove}
          viewBox={'0 0 496 512'}
        />
      );
    case 'fear':
      return (
        <SvgIcon
          fontSize={props.size}
          color="secondary"
          component={IconFear}
          viewBox={'0 0 496 512'}
        />
      );
    case 'cheer':
      return (
        <SvgIcon
          fontSize={props.size}
          color="warning"
          component={IconCheer}
          viewBox={'0 0 496 512'}
        />
      );
    default:
      return (
        <SvgIcon
          fontSize={props.size}
          color="warning"
          component={IconCheer}
          viewBox={'0 0 496 512'}
        />
      );
  }
};

export const getIconName = (feel: string | null): string => {
  if (feel) {
    switch (feel) {
      case FeelNames.anger:
        return FeelIconName.anger;
      case FeelNames.love:
        return FeelIconName.love;
      case FeelNames.sadness:
        return FeelIconName.sadness;
      case FeelNames.fear:
        return FeelIconName.fear;
      default:
        return FeelIconName.cheer;
    }
  } else {
    return 'default';
  }
};

export default Icon;
