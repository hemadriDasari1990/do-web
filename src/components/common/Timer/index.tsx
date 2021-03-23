import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timerTextStyle: {
    color: "#1e1e58",
    top: "50%",
    position: "relative",
    transform: "translateY(-50%)",
    textAlign: "center",
  },
  boxStyle: {
    borderRadius: 5,
    backgroundColor: "#1f1f581c",
    height: 40,
    width: 40,
  },
}));

const Timer = ({ startDateTime, interval }: { [Key: string]: any }) => {
  const { boxStyle, timerTextStyle } = useStyles();
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
    <Box display="flex" mr={2}>
      <Box ml={1} className={boxStyle}>
        <Typography className={timerTextStyle} variant="h3">
          {time?.days}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3"> &nbsp;days</Typography>
      </Box>
      <Box ml={1} className={boxStyle}>
        <Typography className={timerTextStyle} variant="h4">
          {time?.hours}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3"> &nbsp;hrs</Typography>
      </Box>
      <Box ml={1} className={boxStyle}>
        <Typography className={timerTextStyle} variant="h4">
          {time?.minutes}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3"> &nbsp;mins</Typography>
      </Box>
      <Box mr={0.3} className={boxStyle}>
        <Typography className={timerTextStyle} variant="h4">
          {time?.seconds}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3"> &nbsp;secs</Typography>
      </Box>
    </Box>
  );
};

export default Timer;
