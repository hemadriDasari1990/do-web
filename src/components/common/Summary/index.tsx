import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  paperStyle: {
    boxShadow: "none",
  },
}));

const Summary = React.memo((props: any) => {
  const { title } = props;
  const { paperStyle } = useStyles();
  return (
    <Paper className={paperStyle}>
      <Box>
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Box>
        <List>{props.children}</List>
      </Box>
    </Paper>
  );
});

export default Summary;
