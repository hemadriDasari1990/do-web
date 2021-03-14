import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import { DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ScrumBoard from "../../assets/board.svg";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getFeedbacks } from "../../redux/actions/feedback";
import { showCreateBoardButton } from "../../redux/actions/common";
// import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";

// import { useHistory } from "react-router";

const FeedbackList = React.lazy(() => import("../Feedback/list"));
const CreateAccount = React.lazy(() => import("./create"));
const CreateAccountGrid = React.lazy(() => import("./createAccountGrid"));
const Summary = React.lazy(() => import("./summary"));
const OrganizationList = React.lazy(() => import("./organizations"));
const AdContainer = React.lazy(() => import("./adContainer"));

const useStyles = makeStyles((theme: Theme) => ({
  titleStyle: {
    fontSize: "3.5rem",
    lineHeight: 1.143,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  imageStyle: {
    height: 300,
    [theme.breakpoints.down("xs")]: {
      height: 250,
      textAlign: "center",
      marginLeft: 0,
    },
  },
  boxStyle: {
    backgroundColor: "#fff",
  },
  boxGridStyle: {
    backgroundColor: "#f5f6f8",
  },
}));

const Home = () => {
  const { titleStyle, imageStyle, boxGridStyle } = useStyles();
  const dispatch = useDispatch();
  // const authenticated: boolean = useAuthenticated();
  // const history = useHistory();
  const { feedback } = useFeedback();
  const { loading } = useLoading();

  useEffect(() => {
    dispatch(showCreateBoardButton(true));
    dispatch(getFeedbacks(true));
    // if(authenticated){
    //   history.push(DASHBOARD);
    // }
  }, []);

  return (
    <React.Fragment>
      <Container disableGutters>
        <Hidden only={["xs"]}>
          <AdContainer />
        </Hidden>
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
                  <Typography className={titleStyle} variant="h1">
                    Let's do retro
                  </Typography>
                </Box>
                <Box>
                  <Typography className={titleStyle} variant="h1">
                    Helps teams to run
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography className={titleStyle} variant="h1">
                    Retrospective's differently
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    It's 100% free and fun! The versatile retrospective tool for
                    agile teams, collaborate with your team{" "}
                  </Typography>
                </Box>
                <Box mb={5}>
                  <Typography variant="body1">
                    and get better in what you do with a modern, powerful and
                    beautiful application. The fun part is expressing emotions
                    as reactions on notes.
                  </Typography>
                </Box>
                <Box>
                  <CreateAccount />
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
                <Box>
                  <Zoom in={true} timeout={2000}>
                    <img
                      src={ScrumBoard}
                      className={imageStyle}
                      width="fit-content"
                    />
                  </Zoom>
                </Box>
              </Grid>
            </Slide>
          </Grid>
        </Box>
        {/* <Box className={boxStyle} padding={0}>
          <Box py={3}>
            <Box textAlign="center">
              <Typography variant="h1">Let's do retro features</Typography>
            </Box>
            <Features />
          </Box>
        </Box> */}
        <Box py={5}>
          <Summary />
        </Box>
        {!loading && feedback?.length ? (
          <Box py={5}>
            <Box py={5}>
              <Box textAlign="center">
                <Typography variant="h1">What people say about us</Typography>
              </Box>
            </Box>
            <Box>
              <FeedbackList feedbacks={feedback} />
            </Box>
          </Box>
        ) : null}
      </Container>

      <Box py={5} className={boxGridStyle}>
        <Container>
          <OrganizationList />
        </Container>
      </Box>
      <Box py={5}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
};

export default Home;
