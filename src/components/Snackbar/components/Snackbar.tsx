import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbar = (props: any) => {
  const { status, message, open } = props
  const [openSnackBar, setOpenSnackBar] = useState(open)

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false);
  }
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openSnackBar}
          autoHideDuration={4000}
          onClose={(event?: React.SyntheticEvent, reason?: string) => handleClose(reason)}
        >
          <Alert onClose={(event?: React.SyntheticEvent, reason?: string) => handleClose(reason)} severity={status}>
            {message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
}

CustomizedSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default CustomizedSnackbar;
