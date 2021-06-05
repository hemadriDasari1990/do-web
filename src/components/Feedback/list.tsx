import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import useStyles from "../styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MobileStepper from "@material-ui/core/MobileStepper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { getFeedbacks } from "../../redux/actions/feedback";
import { getInitials } from "../../util";
import getRandomBGColor from "../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const Loader = React.lazy(() => import("../Loader/components"));

const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    fontSize: 80,
  },
  imageBoxStyle: {
    height: 110,
    width: 90,
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    background: "#f5f6f8",
    borderRadius: 6,
  },
  imageBoxGridStyle: {
    height: 90,
    width: 75,
    borderRadius: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center" /* Centering y-axis */,
    alignItems: "center",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
  },
  avatarTextStyle: {
    // fontSize: 50,
  },
  avatarStyle: {
    height: "auto",
    width: "auto",
    backgroundColor: "unset",
  },
  gridListStyle: {
    flexWrap: "nowrap",
    scrollBehavior: "smooth",
    transform: "translateZ(0)",
  },
  gridListTileStyle: {
    minHeight: "180px !important",
    maxHeight: "180px !important",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    marginRight: 10,
    borderRadius: 6,
  },
  iconButtonStyle: {
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    borderRadius: 6,
  },
  iconButtonSecondaryStyle: {
    background: "linear-gradient(180deg,#ffdb58 0,#ffc800 100%)",
    borderRadius: 6,
  },
  iconButtonGridStyle: {
    marginTop: "auto",
    top: "50%",
  },
  mainBoxStyle: {
    position: "relative",
    height: "100%",
  },
  leftButtonStyle: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: -26,
    transform: "translateY(-50%)",
  },
  rightButtonStyle: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    right: -26,
    transform: "translateY(-50%)",
  },
  stepperStyle: {
    width: 200,
    // "& .MuiMobileStepper-dots": {
    //   marginRight: 5,
    // },
  },
}));

function FeedbackList() {
  const {
    gridListStyle,
    gridListTileStyle,
    iconButtonStyle,
    mainBoxStyle,
    iconButtonSecondaryStyle,
    imageBoxStyle,
    imageBoxGridStyle,
    avatarTextStyle,
    avatarStyle,
    stepperStyle,
  } = useLocalStyles();
  const dispatch = useDispatch();
  const { feedback } = useFeedback();
  const { loading } = useLoading();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    dispatch(getFeedbacks(5, 4, true));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box p={5}>
      <Loader enable={loading} backdrop={true} />
      {!loading && feedback?.length ? (
        <>
          <Box textAlign="center" pb={3}>
            <Typography variant="h1">What people say about us</Typography>
          </Box>
          <Box>
            <Box className={mainBoxStyle}>
              <GridList cols={12} className={gridListStyle}>
                <GridListTile
                  classes={{ root: gridListTileStyle }}
                  key={feedback[activeStep]?._id}
                  cols={12}
                >
                  <Box px={5}>
                    <Box display="flex">
                      <Box className={imageBoxStyle}>
                        <Box
                          className={imageBoxGridStyle}
                          style={{
                            background: getRandomBGColor(activeStep),
                          }}
                        >
                          <Avatar
                            color="secondary"
                            classes={{ root: avatarStyle }}
                          >
                            <Typography
                              variant="h1"
                              className={avatarTextStyle}
                              color="secondary"
                            >
                              {getInitials(feedback[activeStep]?.user?.name)}
                            </Typography>
                          </Avatar>
                        </Box>
                      </Box>
                      <Box m={3}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "normal" }}
                        >
                          <b>{feedback[activeStep]?.title} - </b>
                          {feedback[activeStep]?.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </GridListTile>
              </GridList>
            </Box>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ float: "right" }}
              mt={1.5}
            >
              <MobileStepper
                variant="dots"
                steps={feedback?.length}
                position="static"
                activeStep={activeStep}
                className={stepperStyle}
                nextButton={
                  <Tooltip arrow title="Scroll Right" placement="right">
                    <IconButton
                      size="small"
                      className={iconButtonSecondaryStyle}
                      onClick={() => handleNext()}
                      disabled={activeStep === feedback?.length - 1}
                    >
                      <ArrowForwardIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                }
                backButton={
                  <Tooltip arrow title="Scroll Left" placement="left">
                    <IconButton
                      size="small"
                      className={iconButtonStyle}
                      onClick={() => handleBack()}
                      disabled={activeStep === 0}
                    >
                      <ArrowBackIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                }
              />
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export default FeedbackList;
