import React, { useState } from "react";
import Container from "../Container/Container";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Link,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { OpenState } from "app/constants/open-state";
import { observer } from "mobx-react";
import { Box } from "@mui/system";

const Header = observer(() => {
  const [showDrawer, setShowDrawer] = useState<OpenState>(OpenState.Closed);

  const toggleDrawer = () => {
    switch (showDrawer) {
      case OpenState.Opened:
        setShowDrawer(OpenState.Closed);
        break;
      case OpenState.Closed:
        setShowDrawer(OpenState.Opened);
        break;
      default:
        break;
    }
  };

  return (
    <header className="header">
      <Container className="header__container">
        <NavLink className="header__logo" to="/">
          <Link component="span" underline="none" variant="h5">
            FeelsLike
          </Link>
        </NavLink>
        <Stack
          sx={{ marginLeft: "auto" }}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <NavLink
            className="header__link"
            to="/journal"
            activeClassName="header__link--active"
          >
            <Button variant="contained" size="small" LinkComponent="span">
              Journal
            </Button>
          </NavLink>
          <button className="header__menu-btn" onClick={toggleDrawer}>
            <Avatar variant="circular" sx={{ bgcolor: "#1d3557" }}>
              <PersonOutlinedIcon />
            </Avatar>
          </button>
        </Stack>
        <SwipeableDrawer
          anchor="right"
          open={showDrawer === OpenState.Opened}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <Box
            sx={{ minWidth: "200px", padding: "10px" }}
            className="header__drawer"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography variant="body1">Username</Typography>
              <Avatar variant="circular" sx={{ bgcolor: "#1d3557" }}>
                <PersonOutlinedIcon />
              </Avatar>
            </Stack>
          </Box>
        </SwipeableDrawer>
      </Container>
    </header>
  );
});

export default Header;
