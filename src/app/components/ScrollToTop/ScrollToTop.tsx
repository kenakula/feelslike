import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import './ScrollToTop.scss';

const ScrollToTop = () => {
  const clickHandler = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  return (
    <Box className="scroll-to-top">
      <IconButton
        color="primary"
        size="large"
        className="scroll-to-top__button"
        onClick={clickHandler}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Box>
  );
};

export default ScrollToTop;
