import { Avatar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { MEMBERS_PER_PAGE } from "../../../util/constants";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import React from "react";
import { Suspense } from "react";
import Zoom from "@material-ui/core/Zoom";
import { getInvitedMembers } from "../../../redux/actions/invite";
import { storeMenuItem } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useParams } from "react-router-dom";
import useStyles from "../../styles/iconStyle";

const Members = () => {
  const dispatch = useDispatch();
  const { iconGridStyle, iconStyle } = useStyles();
  const { cursor } = useMainStyles();
  const { boardId } = useParams<{ boardId: string }>();

  const handleMembers = () => {
    dispatch(storeMenuItem("members"));
    dispatch(getInvitedMembers(boardId, "", 0, MEMBERS_PER_PAGE));
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <List>
          <ListItem
            alignItems="flex-start"
            onClick={() => handleMembers()}
            className={cursor}
          >
            <ListItemAvatar>
              <Zoom in={true} timeout={2000}>
                <Avatar className={iconGridStyle} variant="square">
                  <PersonOutlinedIcon className={iconStyle} />
                </Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText primary="Members" secondary="Members invited" />
          </ListItem>
        </List>
      </Box>
    </Suspense>
  );
};

export default Members;
