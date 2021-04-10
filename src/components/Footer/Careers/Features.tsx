import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CodeIcon from "@material-ui/icons/Code";
import FaceIcon from "@material-ui/icons/Face";
import GPSOffIcon from "@material-ui/icons/GpsOff";
import Grid from "@material-ui/core/Grid";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import Slide from "@material-ui/core/Slide";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatarStyle: {
    background: "linear-gradient(180deg,#f67c1b 0,#e15500) ",
  },
});

function Features() {
  const { avatarStyle } = useStyles();
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography variant="h2"> Our Core Values</Typography>
      </Box>
      <Grid container>
        <Slide
          direction="right"
          in={true}
          timeout={1500}
          mountOnEnter
          unmountOnExit
        >
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <PublicIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Impact"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      We're a small team operating at global Web scale. What you
                      do here really matters.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Grid>
        </Slide>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Zoom in={true} timeout={2000}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <FaceIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Curiosity"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Let's do retro is not a "that's just the way it is" kind
                      of place.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Zoom>
        </Grid>

        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <GPSOffIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="No Jerks"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      This is not just a platitude. We can't overstate how
                      serious we are about this.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Slide>
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <GroupWorkIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Inclusion"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      We need a diverse team to serve a diverse global
                      community. We encourage applicants of all genders, ages,
                      abilities, orientations, and ethnicities to apply.
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </Slide>
        </Grid>

        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Zoom in={true} timeout={2000}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <SwapCallsIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Flexibility"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Work from anywhere with flexible PTO and generous parental
                      leave policies.
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </Zoom>
        </Grid>

        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar className={avatarStyle}>
                  <CodeIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Open Source"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      We have a strong preference for using, publishing, and
                      contributing back to open source software.
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </Slide>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Features;
