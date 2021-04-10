import "./socket";

import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import React, { Suspense, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./routes";
import Typography from "@material-ui/core/Typography";
import theme from "./theme";

const ScrollTop = React.lazy(() => import("./components/ScrollTop"));
const DoSnackbar = React.lazy(() => import("./components/Snackbar/components"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    // minHeight: "90vh"
  },
}));

const App = () => {
  const { boxStyle } = useStyles();

  /* States */
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      setIsDisconnected(false);
    } else {
      setIsDisconnected(true);
    }
  };

  const handleClose = () => {
    setIsDisconnected(false);
  };

  return (
    <Suspense fallback={<div></div>}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={boxStyle}>
          <Box>
            <Routes />
            <ScrollTop />
          </Box>
        </Box>
        {isDisconnected && (
          <DoSnackbar
            open={isDisconnected}
            status="warning"
            handleClose={handleClose}
          >
            <Typography variant="h6" color="secondary">
              You are not connected to the internet
            </Typography>
          </DoSnackbar>
        )}
      </MuiThemeProvider>
    </Suspense>
  );
};

export default App;
