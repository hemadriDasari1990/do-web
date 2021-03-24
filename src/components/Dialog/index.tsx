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
import Loader from "../Loader/components";

const useStyles = makeStyles(() => ({
  paperStyle: (props: any) => ({
    maxWidth: props.maxWidth || 700,
    overflowY: "unset",
  }),
  closeIconStyle: (props: any) => ({
    position: "absolute",
    left: props.maxWidth ? "95%" : "97%",
    top: props.maxWidth ? "-4%" : "-6%",
    background:
      "linear-gradient(270deg, rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat",
    color: "#fff",
    borderRadius: "50%",
  }),
  contentStyle: {
    overflowX: "hidden",
  },
}));

export default function ResponsiveDialog(props: any) {
  const {
    title,
    children,
    pcta,
    scta,
    open,
    handleSave,
    handleSecondarySubmit,
    handleClose,
    disablePrimaryCTA,
    disableSecondaryCTA,
    maxWidth,
    hideButton = false,
    hideSecondary,
    loading,
  } = props;
  const { paperStyle, closeIconStyle, contentStyle } = useStyles({ maxWidth });

  const handleSecondary = () => {
    if (typeof handleSecondarySubmit === "function") {
      handleSecondarySubmit();
    }
  };

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
        <DialogContent className={contentStyle}>
          <Loader enable={loading} />
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => handleClose()} className={closeIconStyle}>
            <CloseOutlinedIcon />
          </IconButton>
          {!hideSecondary && scta && (
            <Button
              onClick={() => handleSecondary()}
              variant="outlined"
              color="primary"
              disabled={disableSecondaryCTA}
            >
              {scta}
            </Button>
          )}
          {!hideButton && (
            <Button
              onClick={() => handleSave()}
              variant="contained"
              color="primary"
              disabled={disablePrimaryCTA}
            >
              {pcta}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
