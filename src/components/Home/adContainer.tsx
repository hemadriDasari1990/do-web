import { Theme, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import BoardIcon from "../../assets/board";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { SIGNUP } from "../../routes/config";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
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
    background: "#ffc800",
    color: "#fff",
    borderRadius: "50%",
  },
}));

const AdContainer = () => {
  const { dialogStyle, closeIconStyle } = useStyles();
  const history = useHistory();
  const openAdd = localStorage.getItem("add");

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleGetStarted = () => {
    localStorage.setItem("add", "close");
    history.push(SIGNUP);
  };

  useEffect(() => {
    if (!openAdd) {
      setDialogOpen(true);
    }
  }, [openAdd]);

  const handleClose = () => {
    localStorage.setItem("add", "close");
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
              <DialogTitle
                id="responsive-dialog-title"
                style={{ background: "none" }}
              >
                <Typography variant="h2">Let's Get Started</Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Box mt={-1}>
                    <Typography variant="h5" style={{ lineHeight: 1.2 }}>
                      Sign up and get started with Letsdoretro today. A world of
                      fun retrospective awaits!
                    </Typography>
                  </Box>
                </DialogContentText>
                <Box>
                  <Button
                    onClick={() => handleGetStarted()}
                    variant="contained"
                    color="primary"
                    startIcon={<FlashOnIcon color="secondary" />}
                  >
                    Sign Up Free
                  </Button>
                </Box>
              </DialogContent>
            </Box>
          </Slide>
          <Box>
            <Zoom in={true} timeout={2000}>
              <BoardIcon
                stickyNoteColor="#ffc800"
                stickyNoteColor1="#fd7171"
                stickyNoteColor2="#7b68ee"
                stickyNoteColor3="#49ccf9"
                stickyNoteColor4="#00b884"
                hairColor="#2f2e41"
                borderColor="#2f2e41"
                primarySkinColor="#ffb8b8"
                secondarySkinColor="#a0616a"
                shoeColor="#2f2e41"
                shirtColor="#cccccc"
                cornerCircleColor="#cccccc"
                width={281}
                height={226}
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
