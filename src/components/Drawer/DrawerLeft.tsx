import { DASHBOARD, LOGIN } from "../../routes/config";
import { Theme, makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
// import DashboardIcon from '@material-ui/icons/LineStyle'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
// import DownIcon from '@material-ui/icons/GetApp'
import Drawer from '@material-ui/core/Drawer'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
// import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import IconButton from '@material-ui/core/IconButton'
// import ListItemText from '@material-ui/core/ListItemText'
// import LogoIcon from '@material-ui/icons/PostAdd'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
// import MenuIcon from '@material-ui/icons/Menu'
// import MenuOpenIcon from '@material-ui/icons/MenuOpen'
// import MyNetworkIcon from '@material-ui/icons/SupervisedUserCircleOutlined'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
// import PersonIcon from '@material-ui/icons/Person'
// import PreferencesIcon from '@material-ui/icons/Tune'
// import PropTypes from 'prop-types'
import React from 'react';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
// import Tooltip from '@material-ui/core/Tooltip'
// import Typography from '@material-ui/core/Typography'
// import UpIcon from '@material-ui/icons/Publish'
// import WorldIcon from '@material-ui/icons/Public'
import Zoom from '@material-ui/core/Zoom'
import { logout } from "../../redux/actions/login"
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useOrganization } from "../../redux/state/organization"

const drawerWidth = 80;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
  },
  logoIconStyle: {
    padding: 3,
    borderRadius: "50%",
    backgroundColor: "#0072ff",
    width: 25,
    height: 25
  },
  bottomStyle: {
    position: "fixed",
    bottom: 0
  },
  avatarStyle: {
    border: "2px solid #1a2e56",
    backgroundColor: "inherit",
    width: 30,
    height: 30,
  },
  iconStyle: {
    fontSize: 30,
    color: "#1a2e56"
  },
  cursor: {
    cursor: "pointer"
  }
}));

export default function PersistentDrawerLeft() {
  const { drawer, drawerPaper, logoIconStyle, avatarStyle, iconStyle, cursor } = useStyles();
  const { title } = useOrganization();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const handleDashboard = () => {
    history.push(DASHBOARD);
  }

  const refreshDashboard = () => {
    handleDashboard();
  }

  const handleLogout = async () => {
    dispatch(logout());
    await sessionStorage.removeItem("token");
    await sessionStorage.removeItem("refreshToken");
    socket.off("login-success");
    history.push(LOGIN);
}

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
            <Box my={2} display="flex" justifyContent="center" className={cursor} onClick={() => refreshDashboard()}>
              <Box mt={1} mr={0.5}>
                <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
              </Box>
              <Box mt={1}>
                <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
              </Box>
            </Box>
            <Box textAlign="center">
              <Box mb={2}>
                <Tooltip title="Dashbaord" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton onClick={() => handleDashboard()}>
                      <DashboardOutlinedIcon color="primary" className={iconStyle} />
                    </IconButton>
                  </Zoom>
                </Tooltip>
              </Box>
              <Box mb={2}>
                <Tooltip title="Notifications" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton>
                      <NotificationsOutlinedIcon color="primary" className={iconStyle}/>
                    </IconButton>
                  </Zoom>
                </Tooltip>
              </Box>
            </Box>
            <Box mt="auto" textAlign="center">
              <Box mb={2}>
                <Tooltip title="Invite Members" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton>
                      <PersonAddOutlinedIcon color="primary" className={iconStyle} />
                    </IconButton>
                  </Zoom>
                </Tooltip>
              </Box>
              <Box mb={2}>
                <Tooltip title="Manage Account" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton>
                      <SettingsOutlinedIcon color="primary" className={iconStyle} />
                    </IconButton>
                  </Zoom>
                </Tooltip>  
              </Box>
              <Box mb={2}>
                <Tooltip title="Help" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton>
                      <HelpOutlineOutlinedIcon color="primary" className={iconStyle} />
                    </IconButton>
                  </Zoom>
                </Tooltip>
              </Box>
              <Box mb={2}>
                <Tooltip title="Logout" placement="right">
                  <Zoom in={true} timeout={2000}>
                    <IconButton onClick={() => handleLogout()}>
                      <LogoutIcon color="primary" className={iconStyle} />
                    </IconButton>
                  </Zoom>
              </Tooltip>
              </Box>
              <Box>
                <Tooltip title={title} placement="right">
                    <Zoom in={true} timeout={1500}>
                      <IconButton>
                        <Avatar classes={{root: avatarStyle}}>
                          <Typography variant="h4">{title ? title.substring(0, 1) : ''}</Typography>
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