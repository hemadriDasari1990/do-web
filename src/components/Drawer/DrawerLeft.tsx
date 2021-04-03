import {
  COMMERCIAL_DASHBOARD,
  INDIVIDUAL_DASHBOARD,
  LOGIN,
  NOTIFICATIONS,
  TEAM,
} from "../../routes/config";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { DRAWER_WIDTH } from "../../util/constants";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DoLogoIcon from "../common/DoLogoIcon";
import Drawer from "@material-ui/core/Drawer";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { INDIVIDUAL } from "../../util/constants";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../redux/actions/login";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useUser } from "../../redux/state/user";

const useLocalStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    background: "#1f1f58",
  },
  logoIconStyle: {
    padding: 3,
    borderRadius: "50%",
    backgroundColor: "#172b4d",
    width: 25,
    height: 25,
  },
  bottomStyle: {
    position: "fixed",
    bottom: 0,
  },
  avatarStyle: {
    border: "2px solid #fff",
    backgroundColor: "inherit",
    width: 30,
    height: 30,
  },
  iconStyle: {
    // fontSize: 30,
    // color: "#1a2e56",
  },
  cursor: {
    cursor: "pointer",
  },
  iconButtonStyle: {
    background: "#eaeaf121",
    borderRadius: 6,
    padding: 8,
    "&:hover": {
      background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
      borderRadius: 6,
      padding: 8,
    },
  },
}));

export default function PersistentDrawerLeft() {
  const {
    drawer,
    drawerPaper,
    avatarStyle,
    iconStyle,
    iconButtonStyle,
  } = useLocalStyles();
  const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const { accountType } = useLogin();

  const handleDashboard = () => {
    if (accountType === INDIVIDUAL) {
      history.push(INDIVIDUAL_DASHBOARD);
    } else {
      history.push(COMMERCIAL_DASHBOARD);
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    await sessionStorage.removeItem("token");
    await sessionStorage.removeItem("refreshToken");
    socket.off("login-success");
    history.push(LOGIN);
  };

  const handleTeams = () => {
    history.push(TEAM);
  };

  const handleNotifications = () => {
    history.push(NOTIFICATIONS);
  };

  return (
    <React.Fragment>
      <Drawer
        className={drawer}
        variant="permanent"
        classes={{
          paper: drawerPaper,
        }}
        anchor="left"
      >
        {/* <Box className={toolbar} flexDirection="column"/> */}
        <DoLogoIcon display="flex" justifyContent="center" my={2} />
        <Box textAlign="center">
          <Box mb={2}>
            <Tooltip arrow title="Dashbaord" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  onClick={() => handleDashboard()}
                  classes={{ root: iconButtonStyle }}
                >
                  <DashboardOutlinedIcon
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={2}>
            <Tooltip arrow title="Notifications" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleNotifications()}
                >
                  <NotificationsOutlinedIcon
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
        </Box>
        <Box mt="auto" textAlign="center">
          <Box mb={2}>
            <Tooltip arrow title="Manage Teams" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleTeams()}
                >
                  <GroupAddOutlinedIcon
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={2}>
            <Tooltip arrow title="Manage Account" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton size="medium" classes={{ root: iconButtonStyle }}>
                  <SettingsOutlinedIcon
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={2}>
            <Tooltip arrow title="Help" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton size="medium" classes={{ root: iconButtonStyle }}>
                  <HelpOutlineOutlinedIcon
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={2}>
            <Tooltip arrow title="Logout" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon color="secondary" className={iconStyle} />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip arrow title={name} placement="right">
              <Zoom in={true} timeout={1500}>
                <IconButton>
                  <Avatar classes={{ root: avatarStyle }}>
                    {/* <Typography variant="h4" color="secondary">
                      {name ? name.substring(0, 1) : ""}
                    </Typography> */}
                  </Avatar>
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
