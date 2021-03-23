import React, { Suspense } from "react";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import { ROOT } from "../../../routes/config";
import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../../socket";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../redux/state/user";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/login";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 110,
    height: 110,
    margin: "auto",
    background:
      "linear-gradient(270deg, rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat",
  },
  logoutAvatar: {
    backgroundColor: "#ffe1e1",
  },
  logoutIcon: {
    fill: "#f50057",
  },
  cursor: {
    cursor: "pointer",
  },
  settingsAvatar: {
    backgroundColor: "#eff8fe",
  },
}));

const UserAccount = (props: any) => {
  const { handleDrawerClose } = props;
  const {
    avatar,
    logoutAvatar,
    logoutIcon,
    cursor,
    settingsAvatar,
  } = useStyles();
  const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    socket.off("login-success");
    handleDrawerClose();
    history.push(ROOT);
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <Zoom in={true} timeout={2000}>
          <Avatar alt={name} className={avatar} color="primary">
            <Typography variant="caption" color="secondary">
              {name ? name.substring(0, 1) : ""}
            </Typography>
          </Avatar>
        </Zoom>
      </Box>
      <Box my={3} textAlign="center">
        <Typography variant="h3">{name}</Typography>
      </Box>
      <Divider />
      <Box>
        <List>
          <ListItem
            alignItems="flex-start"
            onClick={() => handleLogout()}
            className={cursor}
          >
            <ListItemAvatar>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Avatar className={settingsAvatar} variant="square">
                  <SettingsIcon color="primary" />
                </Avatar>
              </Slide>
            </ListItemAvatar>
            <Tooltip arrow title="Manage Account" placement="bottom-start">
              <ListItemText
                primary="Manage Account"
                secondary="Update Settings or manage account"
              />
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItem
            alignItems="flex-start"
            onClick={() => handleLogout()}
            className={cursor}
          >
            <ListItemAvatar>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Avatar className={logoutAvatar} variant="square">
                  <LogoutIcon className={logoutIcon} />
                </Avatar>
              </Slide>
            </ListItemAvatar>
            <Tooltip arrow title="Log Out" placement="bottom-start">
              <ListItemText
                primary="Log Out"
                secondary="You'll be logged out"
              />
            </Tooltip>
          </ListItem>
        </List>
      </Box>
      <Divider />
    </Suspense>
  );
};

export default UserAccount;
