import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paperStyle: (props: any) => ({
    maxWidth: props.maxWidth || 700,
    overflowY: "unset",
  }),
  closeIconStyle: {
    position: "absolute",
    left: "95%",
    top: "-4%",
    background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
    color: "#fff",
    borderRadius: "50%",
  },
}));

export default function ResponsiveDialog(props: any) {
  const {
    title,
    children,
    pcta,
    open,
    handleSave,
    handleClose,
    disablePrimaryCTA,
    maxWidth,
  } = props;
  const { paperStyle, closeIconStyle } = useStyles({ maxWidth });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        classes={{ paper: paperStyle }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h3">{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => handleClose()} className={closeIconStyle}>
            <CloseOutlinedIcon />
          </IconButton>
          <Button
            onClick={() => handleSave()}
            variant="contained"
            color="primary"
            disabled={disablePrimaryCTA}
          >
            {pcta}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
