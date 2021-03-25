import "./socket";

import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import React, { Suspense, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./routes";
import Typography from "@material-ui/core/Typography";
import theme from "./theme";
import { useAuthenticated } from "./redux/state/common";
import { useLocation } from "react-router";

const Header = React.lazy(() => import("./components/Header"));
const ScrollTop = React.lazy(() => import("./components/ScrollTop"));
const Footer = React.lazy(() => import("./components/Footer"));
const DoSnackbar = React.lazy(() => import("./components/Snackbar/components"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    // minHeight: "90vh"
  },
}));

const App = () => {
  const { boxStyle } = useStyles();
  const authenticated: boolean = useAuthenticated();
  const location = useLocation();
  const pathname: string = location.pathname;

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
        <Header />
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
        {!authenticated && !pathname.includes("/board") && <Footer />}
      </MuiThemeProvider>
    </Suspense>
  );
};

export default App;
