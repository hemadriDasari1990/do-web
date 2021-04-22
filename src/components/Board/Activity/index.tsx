import { getActivities, storeMenuItem } from "../../../redux/actions";

import { ACTIVITIES_PER_PAGE } from "../../../util/constants";
import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import { Suspense } from "react";
import Zoom from "@material-ui/core/Zoom";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useParams } from "react-router-dom";
import useStyles from "../../styles/iconStyle";

const Activity = () => {
  const dispatch = useDispatch();
  const { iconGridStyle, iconStyle } = useStyles();
  const { cursor } = useMainStyles();
  const { boardId } = useParams<{ boardId: string }>();

  const handleActivity = () => {
    dispatch(storeMenuItem("activity"));
    dispatch(getActivities(boardId, "", 0, ACTIVITIES_PER_PAGE));
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <List>
          <ListItem
            alignItems="flex-start"
            onClick={() => handleActivity()}
            className={cursor}
          >
            <ListItemAvatar>
              <Zoom in={true} timeout={2000}>
                <Avatar className={iconGridStyle} variant="square">
                  <SubjectOutlinedIcon className={iconStyle} />
                </Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText primary="Activity" secondary="Board activity" />
          </ListItem>
        </List>
      </Box>
    </Suspense>
  );
};

export default Activity;
