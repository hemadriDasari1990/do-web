import { Avatar } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Suspense } from "react";
import Zoom from "@material-ui/core/Zoom";
import { storeMenuItem } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import useStyles from "../../styles/iconStyle";
import { useSocket } from "../../../redux/state/socket";
import { useParams } from "react-router-dom";

const AboutBoard = () => {
  const dispatch = useDispatch();
  const { iconGridStyle, iconStyle } = useStyles();
  const { cursor } = useMainStyles();
  const { socket } = useSocket();
  const { boardId } = useParams<{ boardId: string }>();

  const handleAboutBoard = () => {
    socket.emit("board-details", {
      id: boardId,
    });
    dispatch(storeMenuItem("about-board"));
  };

  return (
    <Suspense fallback={<div></div>}>
      <List>
        <ListItem
          alignItems="flex-start"
          onClick={() => handleAboutBoard()}
          className={cursor}
        >
          <ListItemAvatar>
            <Zoom in={true} timeout={2000}>
              <Avatar className={iconGridStyle} variant="square">
                <InfoOutlinedIcon className={iconStyle} />
              </Avatar>
            </Zoom>
          </ListItemAvatar>
          <ListItemText
            primary="About this board"
            secondary="View metadata about this board"
          />
        </ListItem>
      </List>
    </Suspense>
  );
};

export default AboutBoard;
