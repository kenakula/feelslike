import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  path: string;
  label: string;
  icon: JSX.Element;
}

export const LinkComponent = ({ path, label, icon }: Props): JSX.Element => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const theme = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsActiveLink(pathname === path);
  }, [pathname, path]);

  return (
    <Tooltip title={label} placement="top">
      <Link
        to={path}
        component={NavLink}
        underline="none"
        aria-label={label}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: '8px',
          color: isActiveLink ? theme.palette.primary.main : '#212121',
        }}
      >
        {icon}
      </Link>
    </Tooltip>
  );
};
