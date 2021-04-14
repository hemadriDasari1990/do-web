// import ActivityOutlinedIcon from "@material-ui/icons/SubjectOutlined";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
// import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
// import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import React from "react";
// import { useUser } from "../../../redux/state/user";
import SecurityIcon from "@material-ui/icons/Security";
import Slide from "@material-ui/core/Slide";
import { Suspense } from "react";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import { storeAction } from "../../../../redux/actions/common";
import { useDispatch } from "react-redux";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
// import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch } from "react-redux";
import useIconStyles from "../../../styles/iconStyle";
import useStyles from "../../../styles";

const ManageActions = () => {
  const { iconGridStyle, iconStyle } = useIconStyles();
  // const { name } = useUser();
  const dispatch = useDispatch();
  const { cursor } = useStyles();

  const handleItem = (action: string) => {
    dispatch(storeAction(action));
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
        </ListItem>
      </List>
    </Suspense>
  );
};

export default ManageActions;
