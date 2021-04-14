// import ActivityOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
// import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@material-ui/core/Slide";
import { Suspense } from "react";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
// import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import useIconStyles from "../../../styles/iconStyle";
import useStyles from "../../../styles";
// import { useUser } from "../../../redux/state/user";

const ManageActions = (props: any) => {
  const { handleDrawerClose } = props;
  const { iconGridStyle, iconStyle } = useIconStyles();
  // const { name } = useUser();
  //   const history = useHistory();
  //   const dispatch = useDispatch();
  const { cursor } = useStyles();

  const handleResetPassword = async () => {
    handleDrawerClose();
  };

  const handleChangeEmail = async () => {};

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <Box>
          <List>
            <ListItem
              alignItems="flex-start"
              onClick={() => handleResetPassword()}
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
                primary="Reset Password"
                secondary="Reset password of your account"
              />
            </ListItem>
            <Divider />
            <ListItem
              alignItems="flex-start"
              onClick={() => handleChangeEmail()}
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
                primary="Change Email Address"
                secondary="You'll be required to login with new email address once updated"
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Suspense>
  );
};

export default ManageActions;
