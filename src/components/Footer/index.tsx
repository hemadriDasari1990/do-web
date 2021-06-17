import {
  ABOUT,
  APPS,
  CAREERS,
  FEATURES,
  GETTING_STARTED,
  PRIVACY_POLICY,
  REACTIONS,
  RETROSPECTIVE,
  SECURITY,
  TEMPLATES,
  TERMS,
  WHY_LETSDORETRO,
} from "../../routes/config";
import { useHistory, useLocation } from "react-router";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import InstantRetroGrid from "../Home/instantRetroGrid";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationIcon from "@material-ui/icons/Room";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import doLogo from "../../assets/do-logo.svg";
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

  const handleWhyLetsdoretro = () => {
    history.push(WHY_LETSDORETRO);
  };

  const handleTemplates = () => {
    history.push(TEMPLATES);
  };

  const handleFacebook = () => {
    const win: any = window.open(
      process.env.REACT_APP_LETSDORETROL_FB_URL,
      "_blank"
    );
    win.focus();
  };

  const handleBoard = () => {
    const win: any = window.open(process.env.REACT_APP_BOARD_URL, "_blank");
    win.focus();
  };

  const handleLinkedin = () => {
    const win: any = window.open(
      process.env.REACT_APP_LETSDORETROL_LINKEDIN_URL,
      "_blank"
    );
    win.focus();
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
                <img src={doLogo} width={35} height={35} />
              </Box>
              <Box>
                <Typography component="h3" variant="h3" color="secondary">
                  Empower agile teams and students to create the next big thing!
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Box>
                  <InstantRetroGrid title="Quick Start Retro" />
                </Box>
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
                  Product
                </Typography>
              </Box>
              <List>
                <ListItem
                  className={listStyle}
                  onClick={() => handleTemplates()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Templates
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem className={listStyle} onClick={() => handleBoard()}>
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Retrospective Board
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
                <ListItem
                  className={listStyle}
                  onClick={() => handleWhyLetsdoretro()}
                >
                  <ListItemText
                    secondary={
                      <Typography variant="overline" color="secondary">
                        Why Letsdoretro?
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
                <ListItem
                  className={listStyle}
                  onClick={() => handleFacebook()}
                >
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
                <ListItem
                  className={listStyle}
                  onClick={() => handleLinkedin()}
                >
                  <ListItemIcon className={listIconStyle}>
                    <LinkedInIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="overline" color="secondary">
                        Linkedin
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
              </List>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={4} xs={12}>
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
                        Dubai, UAE
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
          <Box py={3} display="flex" justifyContent="space-between">
            <Box display="flex">
              <Typography variant="body2" color="secondary">
                Made with
              </Typography>
              <Box mx={0.5}>
                <WhatshotIcon fontSize="small" style={{ color: "#ffc800" }} />
              </Box>
              <Typography variant="body2" color="secondary">
                +
              </Typography>
              <Box mx={0.5} mt={0.2}>
                <FavoriteIcon style={{ color: "#ff0000" }} fontSize="small" />
              </Box>
              <Typography variant="body2" color="secondary">
                by our team in UAE.
              </Typography>
            </Box>
            <Typography variant="body2" color="secondary">
              Copyright © 2021 Letsdoretro.com. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </BottomNavigation>
    </Box>
  );
}
