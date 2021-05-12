import {
  ABOUT,
  APPS,
  CAREERS,
  FEATURES,
  GETTING_STARTED,
  PRIVACY_POLICY,
  RETROSPECTIVE,
  SECURITY,
  TERMS,
  // WHATS_NEXT,
  REACTIONS,
} from "../../routes/config";
import { useHistory, useLocation } from "react-router";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CreateAccount from "../Home/create";
import Divider from "@material-ui/core/Divider";
import DoLogoIcon from "../common/DoLogoIcon";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import Grid from "@material-ui/core/Grid";
import InstagramIcon from "@material-ui/icons/Instagram";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationIcon from "@material-ui/icons/Room";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/core/styles";

const BottomIllustrations = React.lazy(() => import("./BottomIllustrations"));

const useLocalStyles = makeStyles({
  root: {
    // marginTop: -7,
    height: "fit-content",
    backgroundColor: "#242F3E",
    width: "100%",
    // position: 'fixed',
    bottom: 0,
  },
  listStyle: {
    margin: "0px !important",
    padding: "0px !important",
    marginTop: "6px !important",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  listIconStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 33,
  },
  logoTextStyle: {
    color: "#07113f",
  },
  titleStyle: {
    fontWeight: 700,
    color: "#eaeded",
  },
});

export default function Footer() {
  const { root, listStyle, listIconStyle, titleStyle } = useLocalStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const location = useLocation();
  const pathname: string = location.pathname;

  const handleDevelopers = () => {
    history.push(ABOUT);
  };

  const handleCareers = () => {
    history.push(CAREERS);
  };

  const handleTerms = () => {
    history.push(TERMS);
  };

  const handlePrivacy = () => {
    history.push(PRIVACY_POLICY);
  };

  const handleSecurity = () => {
    history.push(SECURITY);
  };

  const handleFeatures = () => {
    history.push(FEATURES);
  };

  const handleRetrospective = () => {
    history.push(RETROSPECTIVE);
  };

  const handleGetStarted = () => {
    history.push(GETTING_STARTED);
  };

  const handleApps = () => {
    history.push(APPS);
  };

  // const handleNext = () => {
  //   history.push(WHATS_NEXT);
  // };

  const handleReactions = () => {
    history.push(REACTIONS);
  };

  return (
    <Box>
      {(pathname.includes("/signup") || pathname.includes("/login")) && (
        <BottomIllustrations />
      )}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={root}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box mt={3}>
                <DoLogoIcon />
              </Box>
              <Box>
                <Typography component="h3" variant="h3" color="secondary">
                  Empower teams to create the next big thing
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <CreateAccount title="Sign up free" />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  className={titleStyle}
                  color="secondary"
                >
                  Company
                </Typography>
              </Box>
              <List>
                <ListItem
                  className={listStyle}
                  onClick={() => handleDevelopers()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        About
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle} onClick={() => handleCareers()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Careers
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem className={listStyle} onClick={() => handleApps()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Apps
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  className={titleStyle}
                  color="secondary"
                >
                  Resources
                </Typography>
              </Box>
              <List>
                <ListItem
                  className={listStyle}
                  onClick={() => handleGetStarted()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Getting Started
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleFeatures()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Features
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleRetrospective()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Retrospective
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleReactions()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        What's Reaction
                      </Typography>
                    }
                  />
                </ListItem>
                {/* <ListItem className={listStyle} onClick={() => handleNext()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        What's Next
                      </Typography>
                    }
                  />
                </ListItem> */}
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  className={titleStyle}
                  color="secondary"
                >
                  Terms
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle} onClick={() => handleTerms()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Terms & Conditions
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle} onClick={() => handlePrivacy()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Privacy Policy
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleSecurity()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Security
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  className={titleStyle}
                  color="secondary"
                >
                  Follow Us
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <FacebookIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline" color="secondary">
                        Facebook
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <TwitterIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline" color="secondary">
                        Twitter
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <InstagramIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline" color="secondary">
                        Instagram
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <YouTubeIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline" color="secondary">
                        Youtube
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  className={titleStyle}
                  color="secondary"
                >
                  Contact Us
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <LocationIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Dubai, United Arab Emirates
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <PhoneAndroidIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        +971-545678591
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <EmailIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    secondary={
                      <Typography
                        variant="overline"
                        color="secondary"
                        style={{
                          textTransform: "lowercase",
                          width: "fit-content",
                        }}
                      >
                        letsdoretro@gmail.com
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Box py={3}>
            <Typography variant="body2" color="secondary">
              Copyright © 2021 Letsdoretro.com. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </BottomNavigation>
    </Box>
  );
}
