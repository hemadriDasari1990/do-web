import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import ConnectIcon from "@material-ui/icons/WifiTethering";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SchoolIcon from "@material-ui/icons/School";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

const useStyles = makeStyles({
  avatarStyle: {
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
  },
});

function Features() {
  const { avatarStyle } = useStyles();
  return (
    <React.Fragment>
      <Box mb={3}>
        <Typography variant="h2"> Our Values</Typography>
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
                  <CreateIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to create
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      Giving people the space to take initiative is how we’ve
                      gotten to where we are, and it’ll be what takes us ahead.
                      We want our employees to find the blank spaces on the map
                      and own them.
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
                  <ConnectIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to connect
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      We genuinely enjoy working, and being together. That, and
                      mutual respect, is the glue that connects us around the
                      world.
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
                  <SupervisedUserCircleIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to fail
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      All-in players aren’t afraid of failure. They commit to a
                      task believing in its success. We’re all committed to
                      getting it done, without the fear of striking out. If
                      you’re all in, we’re with you.
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
                  <SchoolIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to learn
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      We never assume we know it all, and there’s always room
                      for improvement. If we’re not experts in our field, we
                      make sure to acquire the knowledge and the skills
                      necessary to be one.
                    </Typography>
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
                  <ChangeHistoryIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to change
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      Our agility is key to staying competitive in an industry
                      growing at hyper-speed, which rewrites itself every single
                      day. It’s never boring, and our employees end up growing
                      as fast as we do.
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
                  <FavoriteIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4" color="textPrimary">
                    Free to be yourself
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      Our differences drive our success. We work hard to create
                      an environment where everyone feels comfortable and safe
                      to be themselves.
                    </Typography>
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
