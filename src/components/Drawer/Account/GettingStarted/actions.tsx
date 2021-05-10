import React from "react";
import { Suspense } from "react";
import {
  FEATURES,
  GETTING_STARTED,
  RETROSPECTIVE,
  REACTIONS,
} from "../../../../routes/config";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import useIconStyles from "../../../styles/iconStyle";
import useStyles from "../../../styles";
import TelegramIcon from "@material-ui/icons/Telegram";
import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CallMadeIcon from "@material-ui/icons/CallMade";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const GettingStartedActions = (props: any) => {
  const {} = props;
  const { iconGridStyle, iconStyle } = useIconStyles();
  const { cursor } = useStyles();

  const handleRetrospective = () => {
    const win: any = window.open(RETROSPECTIVE, "_blank");
    win.focus();
  };

  const handleGettingStarted = () => {
    const win: any = window.open(GETTING_STARTED, "_blank");
    win.focus();
  };

  const handleFeatures = () => {
    const win: any = window.open(FEATURES, "_blank");
    win.focus();
  };

  const handleReactions = () => {
    const win: any = window.open(REACTIONS, "_blank");
    win.focus();
  };

  return (
    <Suspense fallback={<div></div>}>
      <List>
        <ListItem
          alignItems="flex-start"
          onClick={() => handleGettingStarted()}
          className={cursor}
        >
          <ListItemAvatar>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Avatar className={iconGridStyle} variant="square">
                <TelegramIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Getting Started"
            secondary="Explore key features and possibilities"
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={() => handleGettingStarted()}>
              <CallMadeIcon color="primary" fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          alignItems="flex-start"
          onClick={() => handleRetrospective()}
          className={cursor}
        >
          <ListItemAvatar>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Avatar className={iconGridStyle} variant="square">
                <DashboardIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Sprint Retrospectives"
            secondary="Find out more about sprint retrospectives"
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={() => handleRetrospective()}>
              <CallMadeIcon color="primary" fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          alignItems="flex-start"
          onClick={() => handleFeatures()}
          className={cursor}
        >
          <ListItemAvatar>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Avatar className={iconGridStyle} variant="square">
                <FeaturedVideoIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="Features offered"
            secondary="Find out what we have developed for you"
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={() => handleFeatures()}>
              <CallMadeIcon color="primary" fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          alignItems="flex-start"
          onClick={() => handleFeatures()}
          className={cursor}
        >
          <ListItemAvatar>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Avatar className={iconGridStyle} variant="square">
                <InsertEmoticonIcon className={iconStyle} />
              </Avatar>
            </Slide>
          </ListItemAvatar>
          <ListItemText
            primary="What's Reaction?"
            secondary="Discover more about reactions"
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={() => handleReactions()}>
              <CallMadeIcon color="primary" fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Suspense>
  );
};

export default GettingStartedActions;
