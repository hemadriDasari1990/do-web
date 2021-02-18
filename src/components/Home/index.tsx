import { Box, Typography } from '@material-ui/core';
import { ORGANIZATION, ORGANIZATION_DASHBOARD } from "../../routes/config";
import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useFeedback, useLoading } from "../../redux/state/feedback"

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '../../assets/home.svg'
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { getFeedbacks } from "../../redux/actions/feedback";
import { replaceStr } from "../../util";
import { showCreateBoardButton } from "../../redux/actions/common"
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login"

// const Customers = React.lazy(() => import("./customers"));
const FeedbackList = React.lazy(() => import("../Feedback/list"));
const Features = React.lazy(() => import("../Footer/Features"));

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
    const { feedback } = useFeedback();
    const { loading } = useLoading();
    
    useEffect(() => {
      dispatch(showCreateBoardButton(true));
      dispatch(getFeedbacks());
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
                        <Typography variant="body1">The versatile retrospective tool for agile teams, collaborate with your team </Typography>
                      </Box>
                      <Box mb={5}>
                        <Typography variant="body1">and get better in what you do with a modern, powerful and beautiful application.</Typography>
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
                            Create Organization Account
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
                    <Typography variant="h1">Let's do retro features</Typography>
                  </Box>
                  <Features />
                </Box>
              </Container>
            </Box>
            <Box py={3}>
              <Container disableGutters={true}>
                <Box py={3}>
                  <Box textAlign="center">
                    <Typography variant="h1">What people say about us</Typography>
                  </Box>
                </Box>
                <Box>
                  {!loading && feedback?.length ? <FeedbackList feedbacks={feedback} />: null}
                </Box>
              </Container>
            </Box>
          </Box>
        </React.Fragment>
    )
}

export default Home;
