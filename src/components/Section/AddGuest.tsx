import Box from "@material-ui/core/Box";
import HintMessage from "../HintMessage";
import Loader from "../Loader/components";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { joinMemberToBoard } from "../../redux/actions/join";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useJoinedMembersLoading } from "../../redux/state/join";
// import { getMemberIdByToken } from "../../util";
import { useParams } from "react-router";
import { useState } from "react";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const AvatarList = React.lazy(() => import("../Drawer/Profile/AvatarList"));

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #113561",
      paddingTop: "0px !important",
    },
  },
}));

export default function AddGuest(props: any) {
  const { openDialog } = props;
  const { textfieldStyle } = useStyles();
  const { boardId, token } = useParams<{ boardId: string; token: string }>();
  const dispatch = useDispatch();
  const { loading } = useJoinedMembersLoading();

  /* Local states */
  const [avatarId, setAvatarId] = useState(0);
  const [name, setName] = useState("");

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreate = () => {
    dispatch(
      joinMemberToBoard({
        boardId: boardId,
        name: name,
        avatarId,
        token,
      })
    );
  };

  const handleClose = () => {
    dispatch(
      joinMemberToBoard({
        boardId: boardId,
        name: "Team Member",
        avatarId,
        token,
      })
    );
  };

  const handleAvatar = (avatarId: number) => {
    setAvatarId(avatarId);
  };

  const disableButton = () => {
    if (token && !avatarId) {
      return true;
    }
    return false;
  };

  return (
    <ResponsiveDialog
      open={openDialog}
      title="Join Session"
      pcta={"Save"}
      handleSave={handleCreate}
      handleClose={handleClose}
      maxWidth={700}
      disablePrimaryCTA={disableButton()}
    >
      <Loader enable={loading} backdrop={true} />
      <Box>
        <HintMessage message="Please close this popup if you wish to join anonymously." />
      </Box>
      <Box mb={1}>
        <TextField
          fullWidth
          label="Your full name"
          placeholder="Enter your full name"
          multiline
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          className={textfieldStyle}
        />
      </Box>

      <Box mt={2}>
        <Box>
          <Typography variant="h3">Choose your avatar</Typography>
        </Box>
        <AvatarList handleAvatar={handleAvatar} selectedAvatarId={avatarId} />
      </Box>
    </ResponsiveDialog>
  );
}
