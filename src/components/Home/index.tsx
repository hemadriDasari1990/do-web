import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from "react";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { showCreateBoardButton } from "../../redux/actions/common"
import { useDispatch } from "react-redux";

const Customers = React.lazy(() => import("./customers"));

const useStyles = makeStyles(() => ({
    containerStyle: {
      minHeight: '90vh'
    },
    titleStyle: {
      fontSize: "3.5rem",
      lineHeight: 1.143
    },
    buttonStyle: {
      height: 45
    },
  }));
  
const Home = () => {
    const { containerStyle, titleStyle, buttonStyle } = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(showCreateBoardButton(true));
    }, []);
    
    return (
        <React.Fragment>
            <Container disableGutters={true} className={containerStyle}>
              <Box mt={10}>
                <Grid container spacing={2}>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mb={2}>
                          <Typography className={titleStyle} variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">No shady privacy policies or back doors for advertisers. Just a lightning fast browser that doesn’t sell you out.</Typography>
                        </Box>
                        <Box>
                          <Tooltip title="Get Started">
                            <Button
                              className={buttonStyle}
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Start with board
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
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mb={2}>
                          <Typography className={titleStyle} variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">No shady privacy policies or back doors for advertisers. Just a lightning fast browser that doesn’t sell you out.</Typography>
                        </Box>
                        <Box>
                          <Tooltip title="Get Started">
                            <Button
                              className={buttonStyle}
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Start with board
                            </Button>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Slide>
                  </Grid>
                  <Grid container spacing={2}>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={20} mb={2}>
                          <Typography variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                        </Box>
                        <Box>
                          
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
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={10}>
                          <Customers />
                        </Box>
                      </Grid>
                    </Slide>
                  </Grid>

                  <Grid container spacing={2}>
                    <Slide
                      direction="left"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={20} mb={2}>
                          <Typography variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                        </Box>
                        <Box>
                          
                        </Box>
                      </Grid>
                    </Slide>
                  </Grid>
                  <Grid container spacing={2}>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={20} mb={2}>
                          <Typography variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                        </Box>
                        <Box>
                          
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
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={10}>
                          <Customers />
                        </Box>
                      </Grid>
                    </Slide>
                  </Grid>
                  <Grid container spacing={2}>
                    <Slide
                      direction="left"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Box mt={20} mb={2}>
                          <Typography variant="h1">Ok! Let's do retro with our tool differently</Typography>
                        </Box>
                        <Box mb={5}>
                          <Typography variant="body1">Get all the speed and tools with none of the invasions of privacy. Firefox Browser collects so little data about you, we don’t even require your email address to download. That’s because unlike other browsers, we have no financial stake in following you around the web.</Typography>
                        </Box>
                        <Box>
                          
                        </Box>
                      </Grid>
                    </Slide>
                  </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Home;
