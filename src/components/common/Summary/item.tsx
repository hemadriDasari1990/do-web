import { SvgIcon, Typography } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import getRandomBGColor from "../../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  avatarStyle: (props: any) => ({
    background: getRandomBGColor(props.index),
    boxShadow: "0 15px 15px rgb(16 30 54 / 15%)",
  }),
  itemStyle: {
    marginTop: 10,
  },
  iconStyle: {
    color: "#fff",
  },
}));

const SummaryItem = React.memo((props: any) => {
  const { title, icon, value } = props;
  const { avatarStyle, itemStyle, iconStyle } = useStyles(props);
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
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

export default SummaryItem;
