import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import { DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ScrumBoard from "../../assets/board.svg";
import ScrumBoardSkeleton from "../../assets/scrum-real-board.png";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Wave from "../../assets/wave.svg";
import Zoom from "@material-ui/core/Zoom";
import { getFeedbacks } from "../../redux/actions/feedback";
// import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

// import { useHistory } from "react-router";

const FeedbackList = React.lazy(() => import("../Feedback/list"));
const CreateAccount = React.lazy(() => import("./create"));
const CreateAccountGrid = React.lazy(() => import("./createAccountGrid"));
const Summary = React.lazy(() => import("./summary"));
const UserList = React.lazy(() => import("./users"));
const AdContainer = React.lazy(() => import("./adContainer"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  imageStyle: {
    height: 270,
    [theme.breakpoints.down("xs")]: {
      height: 230,
      textAlign: "center",
      marginLeft: 0,
    },
  },
  boxStyle: {
    backgroundColor: "#fff",
  },
  boxGridStyle: {
    backgroundColor: "#F2F4f4",
  },
  skeletonImageStyle: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
}));

const Home = () => {
  const { imageStyle, boxGridStyle, skeletonImageStyle } = useLocalStyles();
  const { titleStyle, titleSecondaryStyle, bannerStyle } = useStyles();
  const dispatch = useDispatch();
  // const authenticated: boolean = useAuthenticated();
  // const history = useHistory();
  const { feedback } = useFeedback();
  const { loading } = useLoading();

  useEffect(() => {
    dispatch(getFeedbacks(true));
    // if(authenticated){
    //   history.push(DASHBOARD);
    // }
  }, []);

  return (
    <React.Fragment>
      <Hidden only={["xs"]}>
        <AdContainer />
      </Hidden>
      <Box py={3} className={bannerStyle}>
        <Container>
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
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    Let's do retro
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    Helps teams to run
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    Retrospective's differently
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="secondary">
                    Provide a safe space to discuss what worked and what didn't.{" "}
                  </Typography>
                </Box>
                <Box mb={5}>
                  <Typography variant="body1" color="secondary">
                    Identify how to improve teamwork by reflecting on what
                    worked, what didn’t, and why. We recommend running a
                    Retrospective with your team every couple of weeks or at the
                    end of a project milestone.
                  </Typography>
                </Box>
                <Box>
                  <CreateAccount title="Get Started for Free" />
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
        </Container>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box pt={5} textAlign="center">
              <Box>
                <Typography variant="h1" className={`${titleSecondaryStyle}`}>
                  It's fun and a way of discussing what worked and what didn't.
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  Start with a Letsdoretro board, lists, and cards. Customize
                  and expand with more features as your teamwork grows. Manage
                  departments, projects, organize boards, and build team
                  spirit—all in one place.
                </Typography>
              </Box>
              <Box mt={5}>
                <Zoom in={true} timeout={2000}>
                  <img
                    src={ScrumBoardSkeleton}
                    className={skeletonImageStyle}
                    height="1334"
                    width="1902"
                  />
                </Zoom>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box mb={-0.9} mt={-15}>
        <img src={Wave} />
      </Box>
      <Box className={boxGridStyle}>
        <Summary />
      </Box>
      {!loading && feedback?.length ? (
        <Box pb={5} className={bannerStyle}>
          <Box py={5}>
            <Box textAlign="center">
              <Typography
                color="secondary"
                variant="h1"
                className={`${titleSecondaryStyle}`}
              >
                What people say about us
              </Typography>
            </Box>
          </Box>
          <Box>
            <FeedbackList feedbacks={feedback} color="secondary" />
          </Box>
        </Box>
      ) : null}
      <Box pt={5}>
        <Container>
          <UserList />
        </Container>
      </Box>
      <Box mb={-0.9}>
        <img src={Wave} />
      </Box>
      <Box className={boxGridStyle}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
};

export default Home;
