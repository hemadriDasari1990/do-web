import Box from "@material-ui/core/Box";
import React from "react";
import { getMemberIdByToken } from "../../util";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const AvatarList = React.lazy(() => import("../Drawer/Profile/AvatarList"));

export default function AddGuest(props: any) {
  const { openDialog, handleClose } = props;
  const { boardId, token } = useParams<{ boardId: string; token: string }>();
  const invitedMemberId = getMemberIdByToken(token);

  const { socket } = useSocket();

  /* Local states */
  const [avatarId, setAvatarId] = useState(0);

  /* Handler functions */

  const handleCreate = () => {
    socket.emit("join-member-to-board", {
      boardId: boardId,
      memberId: invitedMemberId,
      avatarId,
      token,
    });
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
      title="Choose your avatar"
      pcta={"Save"}
      handleSave={handleCreate}
      handleClose={handleClose}
      maxWidth={700}
      disablePrimaryCTA={disableButton()}
    >
      <Box mt={2}>
        <AvatarList handleAvatar={handleAvatar} selectedAvatarId={avatarId} />
      </Box>
    </ResponsiveDialog>
  );
}
