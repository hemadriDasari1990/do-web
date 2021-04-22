import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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

const AboutBoard = () => {
  const dispatch = useDispatch();
  const { iconGridStyle, iconStyle } = useStyles();
  const { cursor } = useMainStyles();

  const handleAboutBoard = () => {
    dispatch(storeMenuItem("about-board"));
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
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
      </Box>
    </Suspense>
  );
};

export default AboutBoard;
