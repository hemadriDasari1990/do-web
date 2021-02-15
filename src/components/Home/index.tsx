import { Box, Typography } from '@material-ui/core';
import { ORGANIZATION, ORGANIZATION_DASHBOARD } from "../../routes/config";
import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '../../assets/home.svg'
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { replaceStr } from "../../util";
import { showCreateBoardButton } from "../../redux/actions/common"
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login"

const Customers = React.lazy(() => import("./customers"));

const useStyles = makeStyles((theme: Theme) => ({
    titleStyle: {
      fontSize: "3.5rem",
      lineHeight: 1.143,
      [theme.breakpoints.down('xs')]: {
        fontSize: 30
      },
    },
    buttonStyle: {
      height: 45,
      "& .MuiButton-label": {
        textAlign: "center !important",
      },
      [theme.breakpoints.down('xs')]: {
        width: "100%"
      },
    },
    imageStyle: {
      height: 300,
      [theme.breakpoints.down('xs')]: {
        height: 250,
        textAlign: "center",
        marginLeft: 0,
      },
    },
    boxStyle: {
      backgroundColor: "#fff"
    }
  }));
  
const Home = () => {
    const { titleStyle, buttonStyle, imageStyle, boxStyle } = useStyles();
    const dispatch = useDispatch();
    const authenticated: boolean = useAuthenticated();
    const { organizationId } = useLogin();
    const history = useHistory();
    
    useEffect(() => {
      dispatch(showCreateBoardButton(true));
      if(authenticated){
        history.push(replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", organizationId));
      }
    }, []);

    const handleCreateOrganization = () => {
      history.push(ORGANIZATION);
    }
    
    return (
        <React.Fragment>
              <Box>
                <Container disableGutters={true}>
                  <Box py={3}>
                    <Grid container spacing={2}>
                        <Slide
                          direction="right"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Box>
                              <Typography className={titleStyle} variant="h1">Ok! Let's do retro</Typography>
                            </Box>
                            <Box>
                              <Typography className={titleStyle} variant="h1">With our application</Typography>
                            </Box>
                            <Box mb={2}>
                              <Typography className={titleStyle} variant="h1">Differently</Typography>
                            </Box>
                            <Box>
                              <Typography variant="body1">No shady privacy policies or back doors for advertisers. Just</Typography>
                            </Box>
                            <Box mb={5}>
                              <Typography variant="body1">a lightning fast browser that doesn’t sell you out.</Typography>
                            </Box>
                            <Box>
                              <Tooltip title="Get Started">
                                <Button
                                  className={buttonStyle}
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={() => handleCreateOrganization()}
                                >
                                  Create Organization for Free
                                </Button>
                              </Tooltip>
                            </Box>
                          </Grid>
                        </Slide>
                        <Slide
                          direction="left"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Box mt={5}>
                              <Zoom in={true} timeout={2000}>
                                <img src={HomeIcon} className={imageStyle} width="fit-content"/>
                              </Zoom>
                            </Box>
                          </Grid>
                        </Slide>
                      </Grid>
                  </Box>
                  </Container>
                  <Box className={boxStyle} padding={0}>
                    <Container disableGutters={true}>
                      <Box py={3}>
                        <Box textAlign="center">
                          <Typography variant="h1">How it works?</Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="200px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Create Your Organization</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="200px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Create Department under your organization</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="200px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Create Projects</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                        </Grid>
                      </Box>
                    </Container>
                  </Box>
                  <Box padding={0}>
                    <Container disableGutters={true}>
                      <Box py={3}>
                        <Box textAlign="center">
                          <Typography variant="h1">Our features</Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="50px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Organiza Boards</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="50px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Creates Sections Dynamically</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="50px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Create Beautiful Notes</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                          <Slide
                            direction="right"
                            in={true}
                            timeout={1500}
                            mountOnEnter
                            unmountOnExit
                          >
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                              <Box textAlign="center">
                                <Box mt={5}>
                                  <Zoom in={true} timeout={2000}>
                                    <img src={HomeIcon} height="50px" width="fit-content"/>
                                  </Zoom>
                                </Box>
                                <Box mt={5} mb={2}>
                                  <Typography variant="h3">Add Reactions to notes</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="h6">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Slide>
                        </Grid>
                      </Box>
                    </Container>
                  </Box>

                  <Box className={boxStyle}>
                    <Container disableGutters={true}>
                      <Grid container spacing={2}>
                        <Slide
                          direction="right"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Box mt={20} mb={2}>
                              <Typography variant="h1">What people say about usy</Typography>
                            </Box>
                            <Box mb={5}>
                              <Customers />
                            </Box>
                          </Grid>
                        </Slide>
                      </Grid>
                    </Container>
                  </Box>
                  <Box>
                    <Container disableGutters={true}>
                      <Grid container spacing={2}>
                        <Slide
                          direction="left"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Box mt={10}>
                              <Customers />
                            </Box>
                          </Grid>
                        </Slide>
                        <Slide
                          direction="right"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Box mt={20} mb={2}>
                              <Typography variant="h1">Ok! Let's do retro with our tool differently</Typography>
                            </Box>
                            <Box mb={5}>
                              <Typography variant="body1">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                            </Box>
                          </Grid>
                        </Slide>
                      </Grid>
                    </Container>
                  </Box>
                </Box>
        </React.Fragment>
    )
}

export default Home;
