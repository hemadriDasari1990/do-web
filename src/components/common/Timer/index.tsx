import React, { useEffect, useState } from "react";

import Box from '@material-ui/core/Box'
// import { DASHBOARD } from "../../routes/config";
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";

const useStyles = makeStyles(() => ({
    timerTextStyle: {
        color: "#0072ff",
        top: "50%",
        position: "relative",
        transform: "translateY(-50%)",
        textAlign: "center"
    },
    boxStyle: {
        borderRadius: 5,
        backgroundColor: "#f3f8ff",
        height: 40,
        width: 40,
    },
    timerStyle: {
        color: "#8c8e92",
        fontWeight: 500
    },
}));

const Timer = ({ callQueuedTime, interval }: {[Key: string]: any}) => {
const { timerStyle, boxStyle, timerTextStyle,  } = useStyles();
  const [callTime] = useState(() => new Date().getTime() + callQueuedTime);
  const [time, setTime] = useState(
    moment
      .utc(moment(callTime).diff(moment(new Date().getTime())))
      .format("mm:ss")
  );
  useEffect(() => {
    const intervalId = setInterval(function() {
      setTime(
        moment
          .utc(moment(callTime).diff(moment(new Date().getTime())))
          .format("mm:ss")
      );
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [callQueuedTime]);
  
  return (
      <React.Fragment>
        <Box ml={1} className={boxStyle}>
            <Typography className={timerTextStyle} variant="h3">{time.split(":")[0]}</Typography>
        </Box>
        <Box mx={0.5}>
            <Typography className={timerStyle} variant="h2">:</Typography>
        </Box>
        <Box mr={1} className={boxStyle}>
            <Typography className={timerTextStyle} variant="h3">{time.split(":")[1]}</Typography>
        </Box>
      </React.Fragment>
  )
};

export default Timer;
