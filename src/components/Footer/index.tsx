import { DEVELOPERS, FEEDBACK } from "../../routes/config";

import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook'
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter'
import { Typography } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    padding: "80px 0",
    marginTop: 60,
    height: "fit-content",
    backgroundColor: "#f3f3f3"
  },
  avatarStyle: {
    fontFamily: "'Lusitana', serif;",
    fontSize: 30,
    paddingBottom: 5,
    fontWeight: 900,
    background: "linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
    paddingTop: 5
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
    }
});

export default function Footer() {
  const { avatarStyle, root, listStyle, listIconStyle } = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  
  const handleDevelopers = () => {
    history.push(DEVELOPERS);
  }

  const handleFeedback = () => {
    history.push(FEEDBACK);
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
                    <Box mb={2}>
                        <Avatar variant="rounded" className={avatarStyle} color="primary">do</Avatar>
                    </Box>
                    <Box>
                        <Typography component="h3" variant="h3">We've helped teams improve in more than <strong>150,000</strong> retrospectives</Typography>
                    </Box>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Menu</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle} onClick={() => handleDevelopers()}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">About</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle} onClick={() => handleFeedback()}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Feedback</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Features</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">FAQ</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Terms</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Terms & Conditions</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Privacy Policy</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Security</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Box mt={2} mb={1.5}>
                        <Typography component="h5" variant="h5" color="inherit">Follow Us</Typography>
                    </Box>
                    <List>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <FacebookIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Facebook</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <TwitterIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Twitter</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <InstagramIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Instagram</Typography>}/>
                        </ListItem>
                        <ListItem className={listStyle}>
                            <ListItemIcon className={listIconStyle}>
                                <YouTubeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography component="h6" variant="h6" color="inherit">Youtube</Typography>}/>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    </BottomNavigation>
  );
}