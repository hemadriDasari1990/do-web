import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paperStyle: {
    maxWidth: 700
  }
}));

export default function ResponsiveDialog(props: any) {
  const { title, children, pcta, scta, open, handleSave, handleClose, disablePrimaryCTA } = props;
  const { paperStyle } = useStyles();
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        classes={{ paper: paperStyle }}
      >
        <DialogTitle id="responsive-dialog-title"><Typography variant="h3">{title}</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="outlined" color="primary">
            {scta}
          </Button>
          <Button onClick={() => handleSave()} variant="contained" color="primary" disabled={disablePrimaryCTA}>
            {pcta}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}