import { DASHBOARD, LOGIN, PROFILE, TEAM } from "../../routes/config";
import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { DRAWER_WIDTH } from "../../util/constants";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DoImage from "../common/Image";
import Drawer from "@material-ui/core/Drawer";
import Feedback from "../Feedback";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import GettingStartedDrawer from "./Account/GettingStarted";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import ManageAccount from "./Account/Manage";
// import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import WelcomeTour from "../WelcomeTour";
import Zoom from "@material-ui/core/Zoom";
import { getAvatar } from "../../util/getAvatar";
import { getInitials } from "../../util";
import { logout } from "../../redux/actions/login";
import { storeMenuItem } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useUser } from "../../redux/state/user";

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("./Account"));
const GettingStartedActions = React.lazy(
  () => import("./Account/GettingStarted/actions")
);

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
    backgroundColor: "#113561",
    width: 25,
    height: 25,
  },
  bottomStyle: {
    position: "fixed",
    bottom: 0,
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
  avatarStyle: {
    background: "#eaeaf121",
    "&:hover": {
      background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
    },
  },
}));

export default function PersistentDrawerLeft() {
  const {
    drawer,
    drawerPaper,
    iconStyle,
    iconButtonStyle,
    avatarStyle,
  } = useLocalStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useUser();

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

  const handleProfile = () => {
    history.push(PROFILE);
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
        <Box display="flex" justifyContent="center" my={2}>
          <DoImage
            src="do-logo.svg"
            width={35}
            height={35}
            placeholderImg="do-logo.svg"
            errorImg="do-logo.svg"
          />
        </Box>
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
                    id="drawer-dashboard-view"
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
                    id="drawer-create-feedback"
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={2}>
            <Tooltip arrow title="Welcome tour" placement="right">
              <Zoom in={true} timeout={2000}>
                <WelcomeTour />
              </Zoom>
            </Tooltip>
          </Box>
        </Box>
        <Box mt="auto" textAlign="center">
          <Box mb={2}>
            <Tooltip arrow title="Manage Teams & Members" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleTeams()}
                >
                  <GroupAddOutlinedIcon
                    id="drawer-create-team"
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
                    id="drawer-manage-account"
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>
          <Box mb={1}>
            <Tooltip arrow title="Help" placement="right">
              <Zoom in={true} timeout={2000}>
                <IconButton
                  size="medium"
                  classes={{ root: iconButtonStyle }}
                  onClick={() => handleGettingStarted()}
                >
                  <HelpOutlineOutlinedIcon
                    id="help"
                    color="secondary"
                    className={iconStyle}
                  />
                </IconButton>
              </Zoom>
            </Tooltip>
          </Box>

          <Box mt={2} mb={1}>
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
        <Box pl={1.5}>
          <Tooltip arrow title="View Profile" placement="right">
            <Zoom in={true} timeout={2000}>
              {user?.avatarId ? (
                <IconButton onClick={handleProfile} size="small">
                  <DoImage
                    src={getAvatar(user?.avatarId)}
                    id="drawer-user"
                    width={40}
                    height={40}
                    placeholderImg={getAvatar(user?.avatarId)}
                    errorImg={getAvatar(user?.avatarId)}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={handleProfile} size="small">
                  <Avatar classes={{ root: avatarStyle }}>
                    <Typography variant="h5" color="secondary" id="drawer-user">
                      {getInitials(user?.name)}
                    </Typography>
                  </Avatar>
                </IconButton>
              )}
            </Zoom>
          </Tooltip>
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
        <GettingStartedActions handleDrawerClose={handleManageAccountClose} />
      </GettingStartedDrawer>
      <Feedback
        open={openFeedback}
        handleDrawerClose={handleFeedbackDrawerClose}
      />
    </React.Fragment>
  );
}
