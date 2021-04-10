import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import notifications from "../../assets/notifications.svg";
const useStyles = makeStyles(() => ({
  centerBoxStyle: {
    left: "50%",
    top: "20%",
    position: "fixed",
  },
}));

export default function Notifications() {
  const { centerBoxStyle } = useStyles();

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h1">Notifications</Typography>
      </Box>
      <Hidden only={["xl", "lg", "md"]}>
        <Box my={1} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={notifications} height="200px" width="fit-content" />
          </Zoom>
        </Box>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Box
          my={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={centerBoxStyle}
        >
          <Zoom in={true} timeout={2000}>
            <img src={notifications} height="400px" width="fit-content" />
          </Zoom>
          <Box mt={2}>
            <Typography variant="h3">
              Notifications aren't enabled yet
            </Typography>
          </Box>
        </Box>
      </Hidden>
    </React.Fragment>
  );
}
