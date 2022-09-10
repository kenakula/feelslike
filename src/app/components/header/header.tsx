import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';
import { Container } from '../container/container';
import { DASHBOARD_PAGE_PATH } from 'app/routes';

export const Header = (): JSX.Element => {
  const [hasNotifications, setHasNotifications] = useState(0);

  return (
    <Box component="header" sx={{ display: 'flex', minHeight: '70px' }}>
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          component={NavLink}
          to={DASHBOARD_PAGE_PATH}
          sx={{ textDecoration: 'none', marginRight: 'auto' }}
        >
          <Typography
            variant="h6"
            sx={{ letterSpacing: '0.07rem' }}
            color="grey.900"
          >
            FeelsLike
          </Typography>
        </Link>
        <IconButton aria-label="notifications" color="primary">
          <Badge badgeContent={hasNotifications} variant="dot" color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Container>
    </Box>
  );
};
