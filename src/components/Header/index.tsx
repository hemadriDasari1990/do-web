import { Container, Typography } from "@material-ui/core";
import { LOGIN, SIGNUP } from "../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import DoLogo from "../common/DoLogo";
import Drawer from "@material-ui/core/Drawer";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
// import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Toolbar from "@material-ui/core/Toolbar";
import { useAuthenticated } from "../../redux/state/common";
import { useHistory } from "react-router-dom";

const drawerWidth = "100%";

const useLocalStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBarStyle: (props: any) => ({
    height: !props.authenticated ? 60 : 0,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    background: "#232f3e",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      background: "#fff !important",
    },
  }),
  toolbar: (props: any) => ({
    minHeight: !props.authenticated ? 60 : 0,
  }),
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  toolbarStyle: {
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: 0,
  },
  listItemStyle: {
    height: 60,
  },
}));

const Header = () => {
  const userAuthenticated = useAuthenticated();
  const history = useHistory();
  // const location = useLocation();
  // const pathname = location.pathname as string;
  // const { name } = useUser();
  const theme = useTheme();

  /* Local state */
  const [authenticated, setAuthenticated] = useState(userAuthenticated);
  const showLogo = !authenticated;
  const {
    root,
    appBarStyle,
    toolbar,
    drawer,
    drawerPaper,
    drawerHeader,
    toolbarStyle,
    listItemStyle,
  } = useLocalStyles({ authenticated });
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAuthenticated(userAuthenticated);
  }, [userAuthenticated]);

  const handleCreateUser = () => {
    setOpen(false);
    history.push(SIGNUP);
  };

  const handleLogin = () => {
    setOpen(false);
    history.push(LOGIN);
  };

  const renderDrawer = () => {
    return (
      <Drawer
        className={drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: drawerPaper,
        }}
      >
        <div className={drawerHeader}>
          <IconButton onClick={handleDrawerClose} color="primary">
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon color="primary" />
            ) : (
              <ChevronRightIcon color="primary" />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            onClick={() => handleCreateUser()}
            className={listItemStyle}
            button
          >
            <ListItemIcon>
              <FlashOnIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h3">Sign Up For Free</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => handleLogin()}
            className={listItemStyle}
            button
          >
            <ListItemIcon>
              <FlashOnIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h3">Login</Typography>}
            />
          </ListItem>
        </List>
      </Drawer>
    );
  };

  const renderAppbar = () => {
    return (
      <Toolbar className={toolbarStyle}>
        <Hidden only={["xs", "sm"]}>
          {showLogo ? <DoLogo color="secondary" /> : null}
          {!authenticated ? (
            <Box display="flex" justifyContent="flex-end">
              <Box mr={2}>
                <Button
                  onClick={() => handleLogin()}
                  size="small"
                  aria-label="add"
                  color="secondary"
                  variant="outlined"
                >
                  Login
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => handleCreateUser()}
                  size="small"
                  aria-label="add"
                  color="primary"
                  variant="contained"
                  startIcon={<FlashOnIcon color="secondary" />}
                >
                  Sign up for free
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Hidden>
        <Hidden only={["xl", "lg", "md"]}>
          <DoLogo color="primary" />
          {!authenticated ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              size="medium"
              onClick={handleDrawerOpen}
            >
              {!open ? (
                <MenuIcon color="primary" />
              ) : (
                <CloseIcon color="primary" />
              )}
            </IconButton>
          ) : (
            <></>
          )}
        </Hidden>
      </Toolbar>
    );
  };
  return (
    <Box className={`${root}`}>
      {!authenticated ? (
        <AppBar className={appBarStyle}>
          <Container>{renderAppbar()}</Container>
        </AppBar>
      ) : null}
      {renderDrawer()}
      <Box className={toolbar} />
    </Box>
  );
};

export default Header;
