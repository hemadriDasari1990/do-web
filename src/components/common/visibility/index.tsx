import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useSocket } from "../../../redux/state/socket";

const assetUrl = process.env.REACT_APP_STATIC_ASSETS_URL as string;

const lockSound = require(assetUrl + "sounds/ui_lock.wav");
const unlockSound = require(assetUrl + "sounds/ui_unlock.wav");

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((e) => ({
  publicIconStyle: {
    color: "#23ce54",
  },
}));

export default function Visibility(props: any) {
  const { openDialog, handleClose, selectedBoard } = props;
  const { publicIconStyle } = useStyles();
  const lockAudio = new Audio(lockSound.default);
  const unlockAudio = new Audio(unlockSound.default);

  /* Local states */
  const [checked, setChecked] = React.useState(
    selectedBoard?.isPrivate ? "private" : "public"
  );
  const { socket } = useSocket();

  const playSound = (audioFile: any) => {
    audioFile.play();
  };

  const handleToggle = (value: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      playSound(unlockAudio);
    } else {
      playSound(lockAudio);
    }
    setChecked(value);
    socket.emit("change-visibility", {
      id: selectedBoard?._id,
      isPrivate: value === "private",
    });
    handleClose();
  };

  useEffect(() => {
    if (!selectedBoard?.isPrivate) {
      setChecked("public");
    } else {
      setChecked("private");
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
            <Switch
              // color="primary"
              edge="end"
              onChange={handleToggle("private")}
              checked={checked == "private"}
              inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
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
            <Switch
              // color="primary"
              edge="end"
              onChange={handleToggle("public")}
              checked={checked === "public"}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </ResponsiveDialog>
  );
}
