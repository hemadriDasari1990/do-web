import { FEATURES, GETTING_STARTED, RETROSPECTIVE } from "../../routes/config";
import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import BoardIcon from "../../assets/board";
import Box from "@material-ui/core/Box";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InfoCard from "../common/InfoCard";
import InstantRetroGrid from "./instantRetroGrid";
import ScrumBoardSkeleton from "../../assets/scrum-real-board.png";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Wave from "../../assets/wave.svg";
import Zoom from "@material-ui/core/Zoom";
import { getDefaultSections } from "../../redux/actions/common";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

const FeedbackList = React.lazy(() => import("../Feedback/list"));
const CreateAccountGrid = React.lazy(() => import("./createAccountGrid"));
const Summary = React.lazy(() => import("./summary"));
const AdContainer = React.lazy(() => import("./adContainer"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  skeletonImageStyle: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
}));

const Home = () => {
  const { skeletonImageStyle } = useLocalStyles();
  const { titleStyle, bannerStyle, boxGridStyle } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // if(authenticated){
    //   history.push(DASHBOARD);
    // }
    dispatch(getDefaultSections());
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
                    Let's do retro
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    With next generation
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    retrospective tool
                  </Typography>
                </Box>
                <Box mb={5}>
                  <Typography variant="body1" color="secondary">
                    Identify how to improve teamwork by reflecting on what
                    worked, what didn’t, and why. Our mission is to help
                    Professionals and Students create the next big thing.
                  </Typography>
                </Box>
                <Box>
                  <InstantRetroGrid
                    title="Quick Start Retro"
                    subTitle="Free forever — no signup required"
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
                  The next generation retrospective tool for professionals,
                  students, collaborate with your team and get better in what
                  you do with a simple, powerful and beautiful tool.
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
        <Box mt={2}>
          <Summary />
        </Box>
        <Box my={3}>
          <Box textAlign="center">
            <Typography variant="h1">Discover</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Box pt={2}>
                <Box mt={2}>
                  <InfoCard
                    title="How to get started? Take a look at our 5 step process to get started"
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
      <Box>
        <Container>
          <FeedbackList />
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
