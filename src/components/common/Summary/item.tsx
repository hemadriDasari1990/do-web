import { SvgIcon, Typography } from "@material-ui/core";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStatusStyles from "../../styles/status";

const useStyles = makeStyles(() => ({
  avatarStyle: {
    backgroundColor: "#ffe9df",
  },
  itemStyle: {
    marginTop: 10,
  },
  iconStyle: {
    color: "#ff5e04",
  },
}));

const SummaryItem = (props: any) => {
  const { title, icon, value, handleButton, hideAction } = props;
  const { avatarStyle, itemStyle, iconStyle } = useStyles();
  const { pendingStyle, pendingTextStyle } = useStatusStyles();
  return (
    <ListItem className={itemStyle} disableGutters>
      <ListItemAvatar>
        <Avatar className={avatarStyle}>
          <SvgIcon component={icon} className={iconStyle} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={<Typography variant="h5">{title}</Typography>} />
      <ListItemSecondaryAction>
        <Box display="flex">
          <Box mt={1} mr={2}>
            <Typography variant="h4">{value}</Typography>
          </Box>
          {!hideAction && (
            <Box mt={1.4}>
              <IconButton
                style={{ width: 25, height: 25 }}
                className={pendingStyle}
                edge="end"
                aria-label="view"
                onClick={() => handleButton()}
              >
                <ArrowForwardIosOutlinedIcon
                  style={{ fontSize: 16, fontWeight: "bold" }}
                  className={pendingTextStyle}
                />
              </IconButton>
            </Box>
          )}
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SummaryItem;
