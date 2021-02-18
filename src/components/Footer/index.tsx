import { CAREERS, DEVELOPERS, FAQ, FEATURES, FEEDBACK, PRIVACY_POLICY, SECURITY, TERMS } from "../../routes/config";

// import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook'
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationIcon from '@material-ui/icons/Room';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import React from 'react';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import TwitterIcon from '@material-ui/icons/Twitter'
import { Typography } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    padding: "80px 0",
    height: "fit-content",
    backgroundColor: "#fff"
  },
    listStyle: {
        margin: "0px !important",
        padding: "0px !important",
        marginTop: "6px !important",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "unset"
        }
    },
    listIconStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 33
    },
    logoTextStyle: {
        color: "#07113f"
    },
    logoIconStyle: {
        padding: 3,
        borderRadius: "50%",
        background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
        width: 25,
        height: 25
    }
});

export default function Footer() {
  const { root, listStyle, listIconStyle, logoIconStyle } = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  
  const handleDevelopers = () => {
    history.push(DEVELOPERS);
  }

  const handleFeedback = () => {
    history.push(FEEDBACK);
  }

  const handleCareers = () => {
    history.push(CAREERS);
  }

  const handleTerms = () => {
    history.push(TERMS);
  }

  const handleFAQ = () => {
    history.push(FAQ);
  }

  const handlePrivacy = () => {
    history.push(PRIVACY_POLICY);
  }

  const handleSecurity = () => {
    history.push(SECURITY);
  }

  const handleFeatures = () => {
    history.push(FEATURES);
  }

  return (
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
                    <Box display="flex">
                        <Box mt={1} mr={0.5}>
                            <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                        </Box>
                        <Box mt={1} mr={1}>
                            <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                        </Box>
                    </Box>
                    <Box>
                        <Typography component="h3" variant="h3">We're helping teams to imrove retrospectives</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Menu</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle} onClick={() => handleDevelopers()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">About</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handleFeedback()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Feedback</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handleFeatures()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Features</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Company</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle} onClick={() => handleCareers()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Careers</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handleFAQ()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">FAQ</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Terms</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle} onClick={() => handleTerms()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Terms & Conditions</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handlePrivacy()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Privacy Policy</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handleSecurity()}>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Security</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Follow Us</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <FacebookIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Facebook</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <TwitterIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Twitter</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <InstagramIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Instagram</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <YouTubeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Youtube</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Contact Us</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <LocationIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">Dubai, United Arab Emirates</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <PhoneAndroidIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit">+971-545678591</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="overline" color="inherit" style={{textTransform: "lowercase", width: "fit-content"}}>contact@do.com</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Box mt={3}>
                <Typography variant="body2">Copyright © 2021 Let's do retro Inc. All rights reserved.</Typography>
            </Box>
        </Container>
    </BottomNavigation>
  );
}