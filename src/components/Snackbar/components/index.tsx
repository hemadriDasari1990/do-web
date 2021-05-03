import Alert, { AlertProps } from "@material-ui/lab/Alert";

import ErrorIcon from "@material-ui/icons/BugReport";
import InfoIcon from "@material-ui/icons/Info";
import PropTypes from "prop-types";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";

function DoAlert(props: AlertProps) {
  const iconMapping = {
    error: <ErrorIcon />,
    info: <InfoIcon />,
    success: <SuccessIcon />,
    warning: <WarningIcon />,
  };
  return (
    <Alert
      elevation={6}
      variant="filled"
      {...props}
      iconMapping={iconMapping}
    />
  );
}

const DoSnackbar = (props: any) => {
  const { status, children, open, handleClose } = props;

  const handleSnackbarClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={7000}
        onClose={(event?: React.SyntheticEvent, reason?: string) =>
          handleSnackbarClose(reason)
        }
      >
        <DoAlert
          onClose={(event?: React.SyntheticEvent, reason?: string) =>
            handleSnackbarClose(reason)
          }
          severity={status}
        >
          {children}
        </DoAlert>
      </Snackbar>
    </React.Fragment>
  );
};

DoSnackbar.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DoSnackbar;
