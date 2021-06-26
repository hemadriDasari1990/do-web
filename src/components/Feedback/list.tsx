import { Avatar, IconButton } from "@material-ui/core";
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
import { getInitials } from "../../util";
import getRandomBGColor from "../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const Loader = React.lazy(() => import("../Loader/components"));

const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    fontSize: 80,
  },
  avatarTextStyle: {
    // fontSize: 50,
  },
  avatarStyle: {
    height: 90,
    width: 90,
    borderRadius: "50%",
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

  const renderInitials = () => {
    return (
      <Avatar
        color="secondary"
        style={{
          background: getRandomBGColor(activeStep),
        }}
        classes={{ root: avatarStyle }}
      >
        <Typography variant="h1" className={avatarTextStyle} color="secondary">
          {getInitials(feedback[activeStep]?.user?.name)}
        </Typography>
      </Avatar>
    );
  };

  const renderRating = () => {
    return (
      <Box mx={3} mb={3} mt={1}>
        <Rating
          name="half-rating-read"
          defaultValue={5}
          precision={0.5}
          readOnly
        />
        <Typography variant="body1" style={{ fontWeight: "normal" }}>
          <b>{feedback[activeStep]?.title} - </b>
          {feedback[activeStep]?.description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box height={feedback?.length ? 580 : 0}>
      <Loader enable={loading} backdrop={true} />
      {!loading && feedback?.length ? (
        <Box>
          <Box textAlign="center" pb={3}>
            <Typography variant="h1">What people say about us</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Hidden only={["xl", "lg", "md"]}>
                <Box ml={3}>{renderInitials()}</Box>
                {renderRating()}
              </Hidden>
              <Hidden only={["xs", "sm"]}>
                <Box display="flex" p={5}>
                  {renderInitials()}
                  {renderRating()}
                </Box>
              </Hidden>
            </Grid>
          </Grid>
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
      ) : null}
    </Box>
  );
}

export default FeedbackList;
