import { ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import List from "@material-ui/core/List";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";
import useStyles from "../../styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router";
import { TEAM } from "../../../routes/config";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const Banner = (props: any) => {
  const { title, subTitle } = props;
  const { gettingStartedBanner, smallAvatarStyle } = useStyles();
  const history = useHistory();

  const handleCreateTeam = () => {
    history.push(TEAM);
  };

  return (
    <Paper className={gettingStartedBanner}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h6">{subTitle}</Typography>
        </Box>
      </Box>
      <Box py={2}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(0) }}
                className={smallAvatarStyle}
              >
                <GroupOutlinedIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h5">Create a team</Typography>}
              secondary="About 10-15 secs"
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={handleCreateTeam}>
                <ArrowRightIcon color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(1) }}
                className={smallAvatarStyle}
              >
                <PersonOutlinedIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h5">Create members</Typography>}
              secondary="About a minute (Depends)"
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={handleCreateTeam}>
                <ArrowRightIcon color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(2) }}
                className={smallAvatarStyle}
              >
                <PersonAddOutlinedIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h5">Add members to the team</Typography>
              }
              secondary="About 10 secs"
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={handleCreateTeam}>
                <ArrowRightIcon color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(3) }}
                className={smallAvatarStyle}
              >
                <FlightTakeoffIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h5">Launch quick retro</Typography>}
              secondary="About a sec"
            />
          </ListItem>
        </List>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">
          We encourage you to invite your teammates to your first board and
          begin exploring all that letsdoretro.com has to offer. You’ll quickly
          discover that it’s fun and intuitive.
        </Typography>
      </Box>

      {/* <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateTeam()}
            endIcon={<ArrowForwardOutlinedIcon color="secondary" />}
          >
            <Typography variant="h6" color="secondary">
              Create Team Now
            </Typography>
          </Button>
        </Box>
      </Box> */}
    </Paper>
  );
};

export default Banner;
