import { SvgIcon, Typography } from "@material-ui/core";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Box from "@material-ui/core/Box";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  avatarStyle: {
    backgroundColor: "#f7f7f7",
  },
  itemStyle: {
    marginTop: 10,
  },
}));

const SummaryItem = (props: any) => {
  const { title, icon, value, handleButton } = props;
  const { avatarStyle, itemStyle } = useStyles();
  return (
    <ListItem className={itemStyle} disableGutters>
      <ListItemAvatar>
        <Avatar className={avatarStyle}>
          <SvgIcon component={icon} color="primary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={<Typography variant="h5">{title}</Typography>} />
      <ListItemSecondaryAction>
        <IconButton
          // size="small"
          edge="end"
          aria-label="view"
          onClick={() => handleButton()}
        >
          <Typography variant="h4">{value}</Typography>
        </IconButton>
        <IconButton
          // size="small"
          edge="end"
          aria-label="view"
          onClick={() => handleButton()}
        >
          <ArrowForwardIosOutlinedIcon style={{ fontSize: 16 }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SummaryItem;
