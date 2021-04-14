// import ActivityOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import Avatar from "@material-ui/core/Avatar";
import BoardInfo from "../../Board/Info";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
// import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { ROOT } from "../../../routes/config";
import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@material-ui/core/Slide";
import { Suspense } from "react";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../../redux/actions/login";
// import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useIconStyles from "../../styles/iconStyle";
import { useSocket } from "../../../redux/state/socket";
import useStyles from "../../styles";
import ManageAccount from "./Manage";
// import { useUser } from "../../../redux/state/user";

const UserAccount = (props: any) => {
  const { handleDrawerClose, openAccount } = props;
  const { iconGridStyle, iconStyle } = useIconStyles();
  // const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const { cursor, bottomStyle } = useStyles();
  const { socket } = useSocket();
  const [openManageAccount, setOpenManageAccount] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    socket.off("login-success");
    handleDrawerClose();
    history.push(ROOT);
  };

  const handleManageAccount = () => {
    // handleDrawerClose();
    setOpenManageAccount(true);
  };

  const handleManageAccountClose = () => {
    setOpenManageAccount(false);
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <BoardInfo openBoardInfo={openAccount} />
        <ManageAccount
          open={openManageAccount}
          handleDrawerClose={handleManageAccountClose}
        />
        <Box className={bottomStyle}>
          <List>
            <ListItem
              alignItems="flex-start"
              onClick={() => handleManageAccount()}
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
                  <Avatar className={iconGridStyle} variant="square">
                    <SettingsIcon className={iconStyle} />
                  </Avatar>
                </Slide>
              </ListItemAvatar>
              <ListItemText
                primary="Manage Account"
                secondary="Update Settings or manage account"
              />
            </ListItem>
          </List>
          <Divider />
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
                  <Avatar className={iconGridStyle} variant="square">
                    <LogoutIcon className={iconStyle} />
                  </Avatar>
                </Slide>
              </ListItemAvatar>
              <ListItemText
                primary="Log Out"
                secondary="You'll be logged out"
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Suspense>
  );
};

export default UserAccount;
