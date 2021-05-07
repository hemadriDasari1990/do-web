import { Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { getHumanReadableDate, getInitials } from "../../../util";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ChangeAvatarModel from "./ChangeAvatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ProfileSummary from "./Summary";
import { Suspense } from "react";
import UserAvatar from "../Account/userAvatar";
import { getAvatar } from "../../../util/getAvatar";
import { useUser } from "../../../redux/state/user";

const Profile = () => {
  const { user } = useUser();

  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  const handleAvatar = () => {
    setOpenAvatarDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAvatarDialog(false);
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box p={5} display="flex">
        <Box>
          <Box>
            <UserAvatar />
          </Box>
          <Box my={2}>
            <Divider />
          </Box>

          <Typography variant="h3">Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6}>
              <Box mb={1}>
                <ProfileSummary
                  title="Avatar:"
                  value={
                    user?.avatarId ? (
                      <IconButton onClick={handleAvatar} size="small">
                        <img
                          src={getAvatar(user?.avatarId)}
                          width={40}
                          height={40}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleAvatar}>
                        <Avatar>
                          <Typography variant="h5">
                            {getInitials(user?.name)}
                          </Typography>
                        </Avatar>
                      </IconButton>
                    )
                  }
                />
              </Box>
              <Box mb={1}>
                <ProfileSummary title="Full Name:" value={user?.name} />
              </Box>
              <Box mb={1}>
                <ProfileSummary title="Email:" value={user?.email} />
              </Box>
              <Box mb={1}>
                <ProfileSummary
                  title="Account Cereated:"
                  value={getHumanReadableDate(user?.createdAt)}
                />
              </Box>
            </Grid>
            {/* <Grid item xl={4} lg={4} md={6}>
              <Box mb={1}>
                <ProfileSummary
                  title="Total Projects:"
                  value={user?.totalProjects}
                />
              </Box>
              <Box mb={1}>
                <ProfileSummary
                  title="Total Boards:"
                  value={user?.totalBoards}
                />
              </Box>
              <Box mb={1}>
                <ProfileSummary title="Total teams:" value={user?.totalTeams} />
              </Box>
              <Box mb={1}>
                <ProfileSummary
                  title="Total members:"
                  value={user?.totalMembers}
                />
              </Box>
            </Grid> */}
          </Grid>
          <ChangeAvatarModel
            openDialog={openAvatarDialog}
            handleCloseDialog={handleCloseDialog}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default Profile;
