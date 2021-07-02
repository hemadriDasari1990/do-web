import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useSocket } from "../../../redux/state/socket";
import Radio from "@material-ui/core/Radio";

const lockSound = require("../../../assets/sounds/ui_lock.wav");
const unlockSound = require("../../../assets/sounds/ui_unlock.wav");
// const unlockSound: any = React.lazy(() =>
//   require("../../../assets/sounds/ui_unlock.wav")
// );

// const lockSound: any = React.lazy(() =>
//   require("../../../assets/sounds/ui_lock.wav")
// );

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((e) => ({
  publicIconStyle: {
    color: "#23ce54",
  },
}));

function Visibility(props: any) {
  const { openDialog, handleClose, selectedBoard } = props;
  const { publicIconStyle } = useStyles();
  const lockAudio = new Audio(lockSound.default);
  const unlockAudio = new Audio(unlockSound.default);

  /* Local states */
  const [selectedValue, setSelectedValue] = React.useState(
    selectedBoard?.isPrivate ? "private" : "public"
  );
  const { socket } = useSocket();

  const playSound = (audioFile: any) => {
    audioFile.play();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      playSound(unlockAudio);
    } else {
      playSound(lockAudio);
    }
    setSelectedValue(event.target.value);
    socket.emit("change-visibility", {
      id: selectedBoard?._id,
      isPrivate: event.target.value === "private",
    });
    handleClose();
  };

  useEffect(() => {
    if (!selectedBoard?.isPrivate) {
      setSelectedValue("public");
    } else {
      setSelectedValue("private");
    }
  }, [selectedBoard]);

  return (
    <ResponsiveDialog
      open={openDialog}
      title="Change visibility"
      hideButton={true}
      handleClose={handleClose}
      maxWidth={440}
    >
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-private"
            primary="Private"
            secondary="Only board members can see and edit this board"
          />
          <ListItemSecondaryAction>
            <Radio
              checked={selectedValue === "private"}
              onChange={handleChange}
              value="private"
              name="private"
              inputProps={{ "aria-label": "PRIVATE" }}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem disableGutters>
          <ListItemIcon className={publicIconStyle}>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-public"
            primary="Public"
            secondary="Anyone on the internet (including Google) can see this board. Only board members can edit."
          />
          <ListItemSecondaryAction>
            <Radio
              checked={selectedValue === "public"}
              onChange={handleChange}
              value="public"
              name="public"
              inputProps={{ "aria-label": "PUBLIC" }}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </ResponsiveDialog>
  );
}

export default React.memo(Visibility);
