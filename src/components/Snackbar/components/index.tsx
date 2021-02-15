import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DoSnackbar = (props: any) => {
  const { status, children, open, handleClose } = props

  const handleSnackbarClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  }
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={(event?: React.SyntheticEvent, reason?: string) => handleSnackbarClose(reason)}
        >
          <Alert onClose={(event?: React.SyntheticEvent, reason?: string) => handleSnackbarClose(reason)} severity={status}>
            {children}
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
}

DoSnackbar.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default DoSnackbar;
