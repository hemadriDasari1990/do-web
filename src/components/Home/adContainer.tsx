import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ScrumBoard from "../../assets/board.svg";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { USER } from "../../routes/config";
import Zoom from "@material-ui/core/Zoom";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  dialogStyle: {
    position: "fixed",
    left: 0,
    top: "auto",
    right: "auto",
    bottom: 0,
    zIndex: 99,
    overflow: "visible",
    width: 550,
    height: 220,
    marginBottom: 40,
    marginLeft: 40,
    // padding: 10,
  },
  closeIconStyle: {
    position: "absolute",
    left: "96%",
    top: "-10%",
    background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
    color: "#fff",
    borderRadius: "50%",
  },
}));

const AdContainer = () => {
  const { dialogStyle, closeIconStyle } = useStyles();
  const history = useHistory();
  const openAdd = sessionStorage.getItem("add");

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleGetStarted = () => {
    sessionStorage.setItem("add", "close");
    history.push(USER);
  };

  useEffect(() => {
    if (!openAdd) {
      setDialogOpen(true);
    }
  }, [openAdd]);

  const handleClose = () => {
    sessionStorage.setItem("add", "close");
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        classes={{ paper: dialogStyle }}
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        style={{ position: "initial" }} // This was the key point, reset the position of the dialog, so the user can interact with other elements
        disableBackdropClick // Remove the backdrop click (just to be sure)
        disableScrollLock
      >
        <Box p={1} display="flex" justifyContent="space-between">
          <Slide
            direction="up"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <DialogTitle id="responsive-dialog-title">
                <Typography variant="h2">Let's Get Started</Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="h5">
                    Sign up and get started with Letsdoretro today. A world of
                    productive teamwork awaits!
                  </Typography>
                </DialogContentText>
                <Box>
                  <Button
                    onClick={() => handleGetStarted()}
                    variant="contained"
                    color="primary"
                  >
                    Get Started
                  </Button>
                </Box>
              </DialogContent>
            </Box>
          </Slide>
          <Box>
            <Zoom in={true} timeout={2000}>
              <img
                src={ScrumBoard}
                //   className={imageStyle}
                sizes="(max-width: 767px) 100vw, 571.421875px"
                width="280px"
                height="250px"
              />
            </Zoom>
          </Box>
        </Box>
        <DialogActions>
          <IconButton onClick={() => handleClose()} className={closeIconStyle}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AdContainer;
