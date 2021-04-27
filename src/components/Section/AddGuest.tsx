import Box from "@material-ui/core/Box";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const AvatarList = React.lazy(() => import("../Drawer/Profile/AvatarList"));

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #172b4d",
      paddingTop: "0px !important",
    },
  },
}));

export default function AddGuest(props: any) {
  const { openDialog, handleClose } = props;
  const { textfieldStyle } = useStyles();
  const { boardId } = useParams<{ boardId: string }>();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const { socket } = useSocket();

  /* Local states */
  const [guestName, setGuestName] = useState("");
  const [avatarId, setAvatarId] = useState(0);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(event.target.value);
  };

  const handleCreate = () => {
    socket.emit("join-member-to-board", {
      guestName: guestName,
      boardId: boardId,
      email,
      avatarId,
    });
  };

  const handleAvatar = (avatarId: number) => {
    setAvatarId(avatarId);
  };

  const disableButton = () => {
    if (!email && !guestName?.trim()?.length) {
      return true;
    }
    if (email && !avatarId) {
      return true;
    }
    return false;
  };

  return (
    <ResponsiveDialog
      open={openDialog}
      title={!email ? "Let us know your name" : "Select a User Avatar"}
      pcta={"Save"}
      handleSave={handleCreate}
      handleClose={handleClose}
      maxWidth={!email ? 550 : 700}
      disablePrimaryCTA={disableButton()}
    >
      {!email && (
        <Box mb={1}>
          <TextField
            fullWidth
            label="Your full name"
            placeholder="Enter your full name"
            multiline
            value={guestName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event)
            }
            className={textfieldStyle}
          />
        </Box>
      )}
      <Box mt={2}>
        <Box>
          <Typography variant="h3">Choose your avatar</Typography>
        </Box>
        <AvatarList handleAvatar={handleAvatar} selectedAvatarId={avatarId} />
      </Box>
    </ResponsiveDialog>
  );
}
