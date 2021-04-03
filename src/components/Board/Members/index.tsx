import React, { Suspense } from "react";

import { Avatar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { ROOT } from "../../../routes/config";
// import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@material-ui/core/Slide";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../../redux/actions/login";
import socket from "../../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles/iconStyle";

// import { useUser } from "../../../redux/state/user";

const Members = (props: any) => {
  const { handleDrawerClose } = props;
  // const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const { iconGridStyle, iconStyle } = useStyles();

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
        <List>
          <ListItem alignItems="flex-start" onClick={() => handleLogout()}>
            <ListItemAvatar>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Avatar className={iconGridStyle} variant="square">
                  <PersonOutlinedIcon className={iconStyle} />
                </Avatar>
              </Slide>
            </ListItemAvatar>
            <ListItemText primary="Members" secondary="Members invited" />
          </ListItem>
        </List>
      </Box>
    </Suspense>
  );
};

export default Members;
