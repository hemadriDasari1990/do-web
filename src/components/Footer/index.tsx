import {
  ABOUT,
  CAREERS,
  FAQ,
  FEATURES,
  FEEDBACK,
  PRIVACY_POLICY,
  SECURITY,
  TERMS,
  RETROSPECTIVE,
} from "../../routes/config";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
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
import { useHistory, useLocation } from "react-router";
import Wave from "../../assets/wave.svg";
import DoLogoIcon from "../common/DoLogoIcon";

const BottomIllustrations = React.lazy(() => import("./BottomIllustrations"));

const useLocalStyles = makeStyles({
  root: {
    // marginTop: -7,
    height: "fit-content",
    backgroundColor: "#F4F5F7",
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

  const handleFeedback = () => {
    history.push(FEEDBACK);
  };

  const handleCareers = () => {
    history.push(CAREERS);
  };

  const handleTerms = () => {
    history.push(TERMS);
  };

  const handleFAQ = () => {
    history.push(FAQ);
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

  return (
    <Box>
      {(pathname === "/signup" || pathname === "/login") && (
        <BottomIllustrations />
      )}
      {pathname !== "/signup" && pathname !== "/login" && (
        <Box mb={-0.9}>
          <img src={Wave} />
        </Box>
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
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box mt={3}>
                <DoLogoIcon />
              </Box>
              <Box>
                <Typography component="h3" variant="h3">
                  Empowering teams to run retrospectives differently
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
              <Box mt={2} mb={1.5}>
                <Typography variant="h4" className={titleStyle}>
                  Menu
                </Typography>
              </Box>
              <List>
                <ListItem
                  className={listStyle}
                  onClick={() => handleDevelopers()}
                >
                  <ListItemText
                    primary={<Typography variant="overline">About</Typography>}
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleFeedback()}
                >
                  <ListItemText
                    primary={
                      <Typography variant="overline">Feedback</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleFeatures()}
                >
                  <ListItemText
                    primary={
                      <Typography variant="overline">Features</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleRetrospective()}
                >
                  <ListItemText
                    primary={
                      <Typography variant="overline">Retrospective</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
              <Box mt={2} mb={1.5}>
                <Typography variant="h4" className={titleStyle}>
                  Company
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle} onClick={() => handleCareers()}>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Careers</Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle} onClick={() => handleFAQ()}>
                  <ListItemText
                    primary={<Typography variant="overline">FAQ</Typography>}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
              <Box mt={2} mb={1.5}>
                <Typography variant="h4" className={titleStyle}>
                  Terms
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle} onClick={() => handleTerms()}>
                  <ListItemText
                    primary={
                      <Typography variant="overline">
                        Terms & Conditions
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle} onClick={() => handlePrivacy()}>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Privacy Policy</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={listStyle}
                  onClick={() => handleSecurity()}
                >
                  <ListItemText
                    primary={
                      <Typography variant="overline">Security</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
              <Box mt={2} mb={1.5}>
                <Typography variant="h4" className={titleStyle}>
                  Follow Us
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <FacebookIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Facebook</Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <TwitterIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Twitter</Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <InstagramIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Instagram</Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <YouTubeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">Youtube</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
              <Box mt={2} mb={1.5}>
                <Typography variant="h4" className={titleStyle}>
                  Contact Us
                </Typography>
              </Box>
              <List>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">
                        Dubai, United Arab Emirates
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <PhoneAndroidIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline">+971-545678591</Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle}>
                  <ListItemIcon className={listIconStyle}>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="overline"
                        style={{
                          textTransform: "lowercase",
                          width: "fit-content",
                        }}
                      >
                        contact@letsdoretro.com
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Box p={3}>
            <Typography variant="body1">
              Copyright © 2021 Letsdoretro.com. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </BottomNavigation>
    </Box>
  );
}
