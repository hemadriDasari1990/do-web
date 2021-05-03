import AboutBoardInfo from "../../Board/About/info";
import ActivityList from "../../Board/Activity/list";
import Avatar from "@material-ui/core/Avatar";
import BoardInfo from "../../Board/Info";
import Box from "@material-ui/core/Box";
import InvitedMembersList from "../../Board/InvitedMembers/list";
import JoinedMembersList from "../../Board/JoinedMembers/list";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import { ROOT } from "../../../routes/config";
import React from "react";
import { Suspense } from "react";
import Zoom from "@material-ui/core/Zoom";
import { logout } from "../../../redux/actions/login";
import { useAuthenticated } from "../../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useIconStyles from "../../styles/iconStyle";
import { useMenuItem } from "../../../redux/state/board";
import useStyles from "../../styles";

const UserAccount = (props: any) => {
  const { handleDrawerClose, openAccount } = props;
  const { iconGridStyle, iconStyle } = useIconStyles();
  // const { name } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const { itemName } = useMenuItem();
  const { cursor, bottomStyle } = useStyles();
  const authenticated = useAuthenticated();

  const handleLogout = async () => {
    dispatch(logout());
    handleDrawerClose();
    history.push(ROOT);
  };

  return (
    <Suspense fallback={<div></div>}>
      {itemName === "activity" ? <ActivityList /> : null}
      {itemName === "invited-members" ? <InvitedMembersList /> : null}
      {itemName === "joined-members" ? <JoinedMembersList /> : null}
      {itemName === "about-board" ? <AboutBoardInfo /> : null}
      {!itemName || itemName === "account" ? (
        <Box>
          <BoardInfo openBoardInfo={openAccount} />
          {authenticated && (
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
                  <ListItemText
                    primary="Log Out"
                    secondary="You'll be logged out"
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      ) : null}
    </Suspense>
  );
};

export default UserAccount;
