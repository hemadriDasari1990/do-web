import { Avatar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
// import Box from "@material-ui/core/Box";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { ROOT } from "../../../routes/config";
import React from "react";
// import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@material-ui/core/Slide";
import { Suspense } from "react";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../../redux/actions/login";
import socket from "../../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles/iconStyle";
// import { useUser } from "../../../redux/state/user";

const Teams = (props: any) => {
  const { handleDrawerClose } = props;
  const { iconGridStyle, iconStyle } = useStyles();
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
                <GroupOutlinedIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText primary="Teams" secondary="Team invited" />
        </ListItem>
      </List>
    </Suspense>
  );
};

export default Teams;
