import { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import React from "react";
import { Slide } from "@material-ui/core";
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timerTextStyle: {
    color: "#0066ff",
    width: "fit-content",
    textAlign: "center",
  },
  middleStyle: {
    marginTop: 7,
  },
  boxStyle: {
    borderRadius: 5,
    backgroundColor: "#f7f8f9",
    height: 35,
    minWidth: 150,
    maxWidth: 150,
    display: "flex",
  },
}));

const Timer = ({ startDateTime, interval }: { [Key: string]: any }) => {
  const { boxStyle, timerTextStyle, middleStyle } = useStyles();
  const sessionStartDateTime: any = new Date(startDateTime).getTime();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const dateDiffInDays = () => {
    // Discard the time and time-zone information.
    const currentDateTime: any = new Date().getTime();
    let milisec_diff = null;
    if (sessionStartDateTime < currentDateTime) {
      milisec_diff = currentDateTime - sessionStartDateTime;
    } else {
      milisec_diff = sessionStartDateTime - currentDateTime;
    }
    const dd = Math.floor(milisec_diff / 1000 / 60 / 60 / 24);
    milisec_diff -= dd * 1000 * 60 * 60 * 24;
    const hh = Math.floor(milisec_diff / 1000 / 60 / 60);
    milisec_diff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(milisec_diff / 1000 / 60);
    milisec_diff -= mm * 1000 * 60;
    const ss = Math.floor(milisec_diff / 1000);
    milisec_diff -= ss * 1000;

    // const date_diff = new Date(milisec_diff);
    setTime({
      days: dd,
      hours: hh,
      minutes: mm,
      seconds: ss,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dateDiffInDays();
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box display="flex" className={boxStyle} justifyContent="space-around">
      {time?.days ? (
        <Box className={middleStyle}>
          <Slide
            direction="down"
            in={true}
            timeout={3000}
            mountOnEnter
            unmountOnExit
          >
            <Typography className={timerTextStyle} variant="h5">
              {time?.days}
            </Typography>
          </Slide>
        </Box>
      ) : null}
      {time?.days ? (
        <Box className={middleStyle}>
          <Typography variant="h5">:</Typography>
        </Box>
      ) : null}
      <Box className={middleStyle}>
        <Slide
          direction="down"
          in={true}
          timeout={2500}
          mountOnEnter
          unmountOnExit
        >
          <Typography className={timerTextStyle} variant="h5">
            {time?.hours}
          </Typography>
        </Slide>
      </Box>
      <Box className={middleStyle}>
        <Typography variant="h5">:</Typography>
      </Box>
      <Box className={middleStyle}>
        <Slide
          direction="down"
          in={true}
          timeout={2000}
          mountOnEnter
          unmountOnExit
        >
          <Typography className={timerTextStyle} variant="h5">
            {time?.minutes}
          </Typography>
        </Slide>
      </Box>
      <Box className={middleStyle}>
        <Typography variant="h5">:</Typography>
      </Box>
      <Box className={middleStyle}>
        <Slide
          direction="down"
          in={true}
          timeout={1500}
          mountOnEnter
          unmountOnExit
        >
          <Typography className={timerTextStyle} variant="h5">
            {time?.seconds}
          </Typography>
        </Slide>
      </Box>
    </Box>
  );
};

export default Timer;
