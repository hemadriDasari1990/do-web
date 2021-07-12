import "./socket";

import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./routes";
import Typography from "@material-ui/core/Typography";
import { initiateSocketConnection } from "./socket";
import { storeSocketInstance } from "./redux/actions/socket";
import theme from "./theme";
import { useDispatch } from "react-redux";

import ScrollTop from "./components/ScrollTop";
import DoSnackbar from "./components/Snackbar/components";

const App = () => {
  const dispatch = useDispatch();

  /* States */
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    handleConnectionChange();
    const socket: any = initiateSocketConnection();
    dispatch(storeSocketInstance(socket));
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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <ScrollTop />
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
  );
};

export default App;
