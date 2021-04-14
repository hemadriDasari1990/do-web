import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Education from "../../assets/education.svg";
// import { DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
// import Hidden from "@material-ui/core/Hidden";
// import ScrumBoardSkeleton from "../../assets/scrum-real-board.png";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
// import { getFeedbacks } from "../../redux/actions/feedback";
// import { useAuthenticated } from "../../redux/state/common";
// import { useDispatch } from "react-redux";
import useStyles from "../styles";

// import { useHistory } from "react-router";

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
  //   const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <React.Fragment>
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
                    Letsdoretro. Click on a topic below, or scroll down for some
                    inspiration.
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
    </React.Fragment>
  );
};

export default GettingStarted;
