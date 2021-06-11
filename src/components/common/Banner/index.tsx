import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ProjectOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import React from "react";
import { TEAM } from "../../../routes/config";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";
import { useHistory } from "react-router";
import useStyles from "../../styles";

const Banner = React.memo((props: any) => {
  const { title, subTitle, titleSecondary, subTitleSecondary } = props;
  const { gettingStartedBanner, smallAvatarStyle } = useStyles();
  const history = useHistory();

  const handleCreateTeam = () => {
    history.push(TEAM);
  };

  return (
    <Paper className={gettingStartedBanner}>
      <Box display="flex" justifyContent="space-between">
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="h3">{title}</Typography>}
              secondary={<Typography variant="h6">{subTitle}</Typography>}
            />
          </ListItem>
        </List>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="h3">{titleSecondary}</Typography>}
              secondary={
                <Typography variant="h6">{subTitleSecondary}</Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box py={2} display="flex" justifyContent="space-between">
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
        <Divider orientation="vertical" flexItem />
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(0) }}
                className={smallAvatarStyle}
              >
                <FlightTakeoffIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h5">Click on Quick Start Retro</Typography>
              }
              secondary="About few seconds"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(1) }}
                className={smallAvatarStyle}
              >
                <ProjectOutlinedIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h5">Choose/Add a project</Typography>
              }
              secondary="About few seconds"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(2) }}
                className={smallAvatarStyle}
              >
                <PersonOutlinedIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h5">Select Annonymous board</Typography>
              }
              secondary="About few seconds"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Avatar
                style={{ background: getRandomColor(3) }}
                className={smallAvatarStyle}
              >
                <PlayArrowIcon color="secondary" fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h5">Click Start</Typography>}
              secondary="About few seconds"
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
});

export default Banner;
