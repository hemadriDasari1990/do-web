import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { ROOT } from "../../../../routes/config";
import React from "react";
// import SecurityIcon from "@material-ui/icons/Security";
import Slide from "@material-ui/core/Slide";
import { Suspense } from "react";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../../../redux/actions/login";
import { storeAction } from "../../../../redux/actions/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useIconStyles from "../../../styles/iconStyle";
import useStyles from "../../../styles";

const ManageActions = () => {
  const { iconGridStyle, iconStyle } = useIconStyles();
  const dispatch = useDispatch();
  const { cursor, bottomStyle } = useStyles();
  const history = useHistory();

  const handleItem = (action: string) => {
    dispatch(storeAction(action));
  };

  const handleLogout = async () => {
    dispatch(logout());
    history.push(ROOT);
  };

  return (
    <Suspense fallback={<div></div>}>
      <List>
        <ListItem
          alignItems="flex-start"
          onClick={() => handleItem("update-password")}
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
                <VpnKeyOutlinedIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Update Password"
            secondary="Update password of your account and you need to answer security questions to do that"
          />
        </ListItem>
        <Divider />
        <ListItem
          alignItems="flex-start"
          onClick={() => handleItem("change-email")}
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
                <MailOutlineOutlinedIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Change Email Address"
            secondary="You'll be required to login with new email address once updated"
          />
        </ListItem>
        <Divider />
        <ListItem
          alignItems="flex-start"
          onClick={() => handleItem("change-name")}
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
                <EditIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Change Name"
            secondary="Update your name. You can update any time"
          />
        </ListItem>
        <Divider />
        {/* <ListItem
          alignItems="flex-start"
          onClick={() => handleItem("security-questions")}
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
                <SecurityIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Update Security questions"
            secondary="These are required to make your account more secure"
          />
        </ListItem> */}
      </List>
      <Box className={bottomStyle}>
        <List>
          <ListItem
            alignItems="flex-start"
            onClick={() => handleLogout()}
            className={cursor}
          >
            <ListItemAvatar>
              <Zoom in={true} timeout={2000}>
                <Avatar className={iconGridStyle} variant="square">
                  <LogoutIcon className={iconStyle} />
                </Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText primary="Log Out" secondary="You'll be logged out" />
          </ListItem>
        </List>
      </Box>
    </Suspense>
  );
};

export default ManageActions;
