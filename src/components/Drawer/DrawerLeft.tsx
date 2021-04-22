import { DASHBOARD, LOGIN, TEAM } from "../../routes/config";
import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import { DRAWER_WIDTH } from "../../util/constants";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DoLogoIcon from "../common/DoLogoIcon";
import Drawer from "@material-ui/core/Drawer";
import Feedback from "../Feedback";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import GettingStartedDrawer from "./Account/GettingStarted";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ManageAccount from "./Account/Manage";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../redux/actions/login";
import { storeMenuItem } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSocket } from "../../redux/state/socket";

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
      background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
      borderRadius: 6,
      padding: 8,
    },
  },
}));

export default function PersistentDrawerLeft() {
  const { drawer, drawerPaper, iconStyle, iconButtonStyle } = useLocalStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const [open, setOpen] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [gettingStarted, setGettingStarted] = useState(false);
  const [openManageAccount, setOpenManageAccount] = useState(false);

  const handleDashboard = () => {
    setGettingStarted(false);
    setOpenFeedback(false);
    setOpenManageAccount(false);
    setOpen(false);
    history.push(DASHBOARD);
  };

  const handleLogout = async () => {
    dispatch(logout());
    socket.off("login-success");
    history.push(LOGIN);
  };

  const handleTeams = () => {
    dispatch(storeMenuItem(""));
    setGettingStarted(false);
    setOpenFeedback(false);
    setOpenManageAccount(false);
    setOpen(false);
    history.push(TEAM);
  };

  const handleFeedback = () => {
    dispatch(storeMenuItem(""));
    setOpenFeedback(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleManageAccount = () => {
    dispatch(storeMenuItem(""));
    setOpenManageAccount(!openManageAccount);
    setGettingStarted(false);
    setOpenFeedback(false);
    setOpen(false);
  };

  const handleManageAccountClose = () => {
    setOpenManageAccount(false);
  };

  const handleGettingStarted = () => {
    dispatch(storeMenuItem(""));
    setGettingStarted(!gettingStarted);
    setOpenFeedback(false);
    setOpenManageAccount(false);
    setOpen(false);
  };

  const handleGettingStartedClose = () => {
    setGettingStarted(false);
  };

  const handleFeedbackDrawerClose = () => {
    setOpenFeedback(false);
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
            <Tooltip arrow title="Give Feedback" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleFeedback()}
                >
                  <FeedbackOutlinedIcon
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
      <Feedback
        open={openFeedback}
        handleDrawerClose={handleFeedbackDrawerClose}
      />
    </React.Fragment>
  );
}
