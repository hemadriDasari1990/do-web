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
const UserList = React.lazy(() => import("./users"));
const AdContainer = React.lazy(() => import("./adContainer"));
const Features = React.lazy(() => import("../Footer/Features"));

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
      height: 230,
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
  skeletonImageStyle: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
  titleSecondaryStyle: {
    fontSize: "2.5rem",
    lineHeight: 1.143,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
}));

const Home = () => {
  const {
    titleStyle,
    imageStyle,
    boxGridStyle,
    skeletonImageStyle,
    titleSecondaryStyle,
  } = useStyles();
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
      <Container>
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
                  <CreateAccount title="Get Started" />
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
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box py={7} textAlign="center">
              <Box>
                <Typography variant="h1" className={titleSecondaryStyle}>
                  It’s more than work. It’s a way of working together.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3">
                  Start with a Letsdoretro board, lists, and cards. Customize
                  and expand with more features as your teamwork grows. Manage
                  projects, organize tasks, and build team spirit—all in one
                  place.
                </Typography>
              </Box>
              <Box mt={3}>
                <CreateAccount title="Signup Now" />
              </Box>
              <Box p={5}>
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

        <Box py={3}>
          <Features />
        </Box>
        <Box py={5}>
          <Summary />
        </Box>
        {!loading && feedback?.length ? (
          <Box py={5}>
            <Box py={5}>
              <Box textAlign="center">
                <Typography variant="h1" className={titleSecondaryStyle}>
                  What people say about us
                </Typography>
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
          <UserList />
        </Container>
      </Box>
      <Box py={5}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
};

export default Home;
