import { DASHBOARD, LOGIN, NOTIFICATIONS, TEAM } from "../../routes/config";
import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { DRAWER_WIDTH } from "../../util/constants";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DoLogoIcon from "../common/DoLogoIcon";
import Drawer from "@material-ui/core/Drawer";
import GettingStartedDrawer from "./Account/GettingStarted";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ManageAccount from "./Account/Manage";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../redux/actions/login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSocket } from "../../redux/state/socket";
import useStyles from "../styles";
import { useUser } from "../../redux/state/user";

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("./Account"));

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
  iconButtonStyle: {
    background: "#eaeaf121",
    borderRadius: 6,
    padding: 8,
    "&:hover": {
      background: "linear-gradient(180deg,#f67c1b 0,#e15500) ",
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
  const { cursor } = useStyles();
  const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const [open, setOpen] = useState(false);
  const [gettingStarted, setGettingStarted] = useState(false);
  const [openManageAccount, setOpenManageAccount] = useState(false);

  const handleDashboard = () => {
    history.push(DASHBOARD);
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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAccount = () => {
    setOpen(!open);
  };

  const handleManageAccount = () => {
    setOpenManageAccount(!openManageAccount);
  };

  const handleManageAccountClose = () => {
    setOpenManageAccount(false);
  };

  const handleGettingStarted = () => {
    setGettingStarted(!gettingStarted);
  };

  const handleGettingStartedClose = () => {
    setGettingStarted(false);
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
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleManageAccount()}
                >
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
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleGettingStarted()}
                >
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
          <Box
            display="flex"
            className={cursor}
            onClick={() => handleAccount()}
          >
            <Box ml={1}>
              <Tooltip arrow title={name} placement="right">
                <Zoom in={true} timeout={1500}>
                  <IconButton size="small">
                    <Avatar classes={{ root: avatarStyle }}>
                      {/* <Typography variant="h4" color="secondary">
                      {name ? name.substring(0, 1) : ""}
                    </Typography> */}
                    </Avatar>
                  </IconButton>
                </Zoom>
              </Tooltip>
            </Box>
            <Box mt={1}>
              <ArrowDropDownIcon color="secondary" />
            </Box>
          </Box>
        </Box>
      </Drawer>
      <PersistentDrawerRight open={open} handleDrawerClose={handleDrawerClose}>
        <UserAccount handleDrawerClose={handleDrawerClose} />
      </PersistentDrawerRight>
      <ManageAccount
        open={openManageAccount}
        handleDrawerClose={handleManageAccountClose}
      />

      <GettingStartedDrawer
        open={gettingStarted}
        handleDrawerClose={handleGettingStartedClose}
      >
        {/* <ManageActions handleDrawerClose={handleManageAccountClose} /> */}
      </GettingStartedDrawer>
    </React.Fragment>
  );
}
