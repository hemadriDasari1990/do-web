import { FEATURES, GETTING_STARTED, RETROSPECTIVE } from "../../routes/config";
import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import BoardIcon from "../../assets/board";
import Box from "@material-ui/core/Box";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InfoCard from "../common/InfoCard";
import ScrumBoardSkeleton from "../../assets/scrum-real-board.png";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Wave from "../../assets/wave.svg";
import Zoom from "@material-ui/core/Zoom";
import { getFeedbacks } from "../../redux/actions/feedback";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

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
  skeletonImageStyle: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
}));

const Home = () => {
  const { skeletonImageStyle } = useLocalStyles();
  const {
    titleStyle,
    titleSecondaryStyle,
    bannerStyle,
    boxGridStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const { feedback } = useFeedback();
  const { loading } = useLoading();

  useEffect(() => {
    dispatch(getFeedbacks(20, true));
    // if(authenticated){
    //   history.push(DASHBOARD);
    // }
  }, []);

  const handleRetrospective = () => {
    const win: any = window.open(RETROSPECTIVE, "_blank");
    win.focus();
  };

  const handleGettingStarted = () => {
    const win: any = window.open(GETTING_STARTED, "_blank");
    win.focus();
  };

  const handleFeatures = () => {
    const win: any = window.open(FEATURES, "_blank");
    win.focus();
  };

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
                    Let's experience the
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    Difference
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    With our Let's do retro tool
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
                  <CreateAccount
                    title="Start a retroboard"
                    subTitle="Free forever — no credit card required"
                  />
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
                <Zoom in={true} timeout={2000}>
                  <Box>
                    <BoardIcon
                      stickyNoteColor="#ffc800"
                      stickyNoteColor1="#fd7171"
                      stickyNoteColor2="#7b68ee"
                      stickyNoteColor3="#49ccf9"
                      stickyNoteColor4="#00b884"
                      hairColor="#2f2e41"
                      borderColor="#cccccc"
                      primarySkinColor="#ffb8b8"
                      secondarySkinColor="#a0616a"
                      shoeColor="#cccccc"
                      pantColor="#2f2e41"
                      shirtColor="#cccccc"
                      cornerCircleColor="#cccccc"
                      width={381}
                      height={320}
                    />
                  </Box>
                </Zoom>
              </Grid>
            </Slide>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box pt={5}>
              <Box mb={2}>
                <Typography variant="h1" className={`${titleStyle}`}>
                  It’s more than work.
                </Typography>
                <Typography variant="h1" className={`${titleStyle}`}>
                  It’s a way of discussing
                </Typography>
                <Typography variant="h1" className={`${titleStyle}`}>
                  What worked and what didn't.
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  Start with Lets do retro board, create sections, notes and
                  express reactions. Expand with more features as your teamwork
                  grows.
                </Typography>
                <Typography variant="body1">
                  Manage projects, and build team spirit all in one place.
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

      <Container>
        <Box mt={2} className={boxGridStyle}>
          <Summary />
        </Box>
      </Container>
      <Container>
        <Box my={3}>
          <Box textAlign="center">
            <Typography variant="h1">Discover</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Box pt={2}>
                <Box mt={2}>
                  <InfoCard
                    title="How to get started? Take a look at our six step process to get started"
                    icon={CallMadeIcon}
                    handleButton={() => handleGettingStarted()}
                    index={0}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Box pt={2}>
                <Box mt={2}>
                  <InfoCard
                    title="What is Sprint Retrospective and how to run?"
                    icon={CallMadeIcon}
                    handleButton={() => handleRetrospective()}
                    index={5}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Box pt={2}>
                <Box mt={2}>
                  <InfoCard
                    title="What features are offered by letdoretro.com?"
                    icon={CallMadeIcon}
                    handleButton={() => handleFeatures()}
                    index={3}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {!loading && feedback?.length ? (
        <Container>
          <Box mt={5} pb={5} className={boxGridStyle}>
            <Box>
              <Box textAlign="center">
                <Typography variant="h1" className={`${titleSecondaryStyle}`}>
                  What people say about us
                </Typography>
              </Box>
            </Box>
            <FeedbackList feedbacks={feedback} />
          </Box>
        </Container>
      ) : null}
      <Box p={5}>
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
