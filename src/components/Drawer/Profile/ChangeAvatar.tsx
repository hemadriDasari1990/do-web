import React, { useEffect } from "react";
import { useUser, useUserLoading } from "../../../redux/state/user";

import { updateAvatar } from "../../../redux/actions/user";
import { useDispatch } from "react-redux";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const AvatarList = React.lazy(() => import("./AvatarList"));

const ChangeAvatarModel = React.memo((props: any) => {
  const { openDialog, handleCloseDialog } = props;
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading } = useUserLoading();

  useEffect(() => {
    if (!loading && user) {
      handleCloseDialog();
    }
  }, [loading, user]);

  const handleClose = () => {
    handleCloseDialog();
  };

  const handleAvatar = (avatarId: number) => {
    dispatch(
      updateAvatar({
        avatarId,
      })
    );
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Select a User Avatar"
        handleClose={handleClose}
        hideButton={true}
        maxWidth={700}
      >
        <AvatarList handleAvatar={handleAvatar} />
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
});

export default ChangeAvatarModel;
