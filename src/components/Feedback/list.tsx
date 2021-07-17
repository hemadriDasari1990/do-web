import { IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import useStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import MobileStepper from "@material-ui/core/MobileStepper";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { getFeedbacks } from "../../redux/actions/feedback";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    fontSize: 80,
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
    iconButtonStyle,
    iconButtonSecondaryStyle,
    stepperStyle,
  } = useLocalStyles();
  const { containerStyle } = useStyles();
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

  const renderName = () => {
    return (
      <Typography variant="h2" color="primary">
        {feedback[activeStep]?.user?.name}
      </Typography>
    );
  };

  const renderRating = () => {
    return (
      <Box mt={1} display="flex">
        <Rating
          name="half-rating-read"
          defaultValue={5}
          precision={0.5}
          readOnly
        />
        <Box ml={1} mt={-0.4}>
          <Typography variant="h5" style={{ fontWeight: "normal" }}>
            5/5
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderFeedback = () => {
    return (
      <Box mt={1}>
        <Typography variant="h4" style={{ fontWeight: "normal" }}>
          <b>{feedback[activeStep]?.title} - </b>
          {feedback[activeStep]?.description}
        </Typography>
      </Box>
    );
  };

  const renderFeebackList = () => {
    return (
      <>
        {!loading && feedback?.length ? (
          <Box>
            <Box textAlign="center" pb={3}>
              <Typography variant="h1">What people say about us</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={containerStyle}
              >
                <Box mx={3} mb={3} mt={1}>
                  {renderName()}
                  {renderFeedback()}
                  {renderRating()}
                </Box>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Divider />
            </Box>
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
        ) : null}
      </>
    );
  };

  return (
    <>
      <Hidden only={["xl", "lg", "md"]}>
        <Box height={feedback?.length ? 620 : 0}>{renderFeebackList()}</Box>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Box height={feedback?.length ? 560 : 0}>{renderFeebackList()}</Box>
      </Hidden>
    </>
  );
}

export default FeedbackList;
