import React, { Suspense, useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Education from "../../assets/education.svg";
import GettingStartedTabs from "./Tabs";
import Grid from "@material-ui/core/Grid";
import Loader from "../Loader/components";
import ReactionsList from "../common/Reactions";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import useStyles from "../styles";

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
}));

const GettingStarted = () => {
  const { imageStyle } = useLocalStyles();
  const { titleStyle, bannerStyle } = useStyles();

  useEffect(() => {}, []);

  return (
    <Suspense fallback={<Loader enable={true} backdrp={true} />}>
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
                    Getting Started
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className={titleStyle}
                    variant="h1"
                    color="secondary"
                  >
                    With Letsdoretro
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography variant="body1" color="secondary">
                    Learn the basics of using Letsdoretro to make all your
                    organizational dreams come true.
                  </Typography>
                </Box>
                <Box mb={5}>
                  <Typography variant="body1" color="secondary">
                    We'll show you how easy it is to get up and running with
                    Letsdoretro. Scroll down for some inspiration.
                  </Typography>
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
                      src={Education}
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
      <Box py={3}>
        <GettingStartedTabs />
      </Box>
      <Box py={3}>
        <Container>
          <Box>
            <Typography variant="h1" color="primary">
              Reactions that you can express
            </Typography>
          </Box>
          <ReactionsList />
        </Container>
      </Box>
    </Suspense>
  );
};

export default GettingStarted;
