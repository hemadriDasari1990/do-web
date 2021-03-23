import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteMember } from "../../redux/actions/member";
import { getMembersByUser } from "../../redux/actions/member";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useMember } from "../../redux/state/member";
import { useMemberLoading } from "../../redux/state/member";
import useStyles from "../styles";
import { useUser } from "../../redux/state/user";

const MemberList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateMember = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const MemberDashboard = () => {
  const {
    root,
    countStyle,
    countTextStyle,
    buttonStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { member } = useMember();
  const { members: membersList } = useMember();
  const { loading } = useMemberLoading();
  const { userId } = useLogin();
  const { user, totalMembers: totalMembersCount } = useUser();

  /* React local states */
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [totalMembers, setTotalMembers] = useState(totalMembersCount);
  const [members, setMembers] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    [Key: string]: any;
  }>({});
  const [openError, setOpenError] = useState(false);

  /* React Hooks */
  useEffect(() => {
    dispatch(getMembersByUser(userId));
  }, []);

  useEffect(() => {
    if (membersList) {
      setShowMemberForm(false);
      setMembers(membersList);
      setTotalMembers(totalMembersCount);
    }
  }, [membersList]);

  useEffect(() => {
    if (!openError && !loading && member?.errorId) {
      setOpenError(true);
    }
    if (!loading && member?.deleted) {
      const membersList = members.filter(
        (d: { [Key: string]: any }) => d._id !== selectedMember._id
      );
      setTotalMembers(membersList?.length);
      setMembers(membersList);
      setSelectedMember({});
      handleCloseDeleteDialog();
    }

    if (!loading && member?._id) {
      const membersList = [...members];
      const memberIndex = membersList.findIndex(
        (p: { [Key: string]: any }) => p._id === member._id
      );
      const memberData = members[memberIndex];
      if (memberData) {
        memberData.name = member.name;
        memberData.email = member.email;
        membersList[memberIndex] = memberData;
        setMembers(membersList);
      } else {
        setMembers((currentMembers: Array<{ [Key: string]: any }>) => [
          ...currentMembers,
          member,
        ]);
        setTotalMembers(totalMembers + 1);
      }
      setSelectedMember({});
      setShowMemberForm(false);
    }
  }, [loading, member]);

  /* Handler functions */

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCreateNewMember = () => {
    setSelectedMember({});
    setShowMemberForm(true);
  };

  const handleBack = () => {
    history.push(DASHBOARD);
  };

  const handleMenu = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    val: string
  ) => {
    switch (val) {
      case "edit":
        setShowMemberForm(true);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={openDeleteDialog}
          title="Delete Note"
          pcta="Delete"
          scta="Cancel"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            {" "}
            Are you sure you want to delete {selectedMember?.name}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleDelete = () => {
    dispatch(deleteMember(selectedMember._id));
    setOpenDeleteDialog(false);
  };

  const renderCreateNewMember = () => {
    return (
      <>
        <Hidden only={["xs"]}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddOutlinedIcon color="secondary" />}
            onClick={() => handleCreateNewMember()}
          >
            <Typography color="secondary" variant="subtitle1">
              Create New Member
            </Typography>
          </Button>
        </Hidden>

        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            className={iconBackStyle}
            onClick={() => handleCreateNewMember()}
          >
            <PersonAddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
      </>
    );
  };

  const handleUpdateForm = () => {
    setShowMemberForm(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenError(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openError}
        status="error"
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {member?.message}
        </Typography>
      </DoSnackbar>
    );
  };
  console.log("members", members);
  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderSnackbar()}
      <Loader enable={loading} />
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xl={members?.length ? 8 : 8}
              lg={members?.length ? 8 : 8}
              md={members?.length ? 6 : 6}
              sm={12}
              xs={12}
            >
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h1">{user?.name}</Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">{user?.name}</Typography>
                </Hidden>
                <Tooltip arrow title="Total Members">
                  <Box ml={2} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>
                      {totalMembers || 0}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                justifyContent={!members?.length ? "flex-end" : "space-around"}
              >
                <Hidden only={["xl", "lg", "md"]}>
                  <IconButton
                    className={iconBackStyle}
                    onClick={() => handleBack()}
                  >
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden only={["xs", "sm"]}>
                  <Box className={buttonStyle}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Dashboard
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {members?.length ? (
                  <Box className={buttonStyle}>{renderCreateNewMember()}</Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!members || !members?.length) ? (
          <Box mt={10}>
            <NoRecords message="No Members found! Please add" />
            <Box mt={5} textAlign="center">
              {renderCreateNewMember()}
            </Box>
          </Box>
        ) : null}
        <UpdateMember
          selectedMember={selectedMember}
          openDialog={showMemberForm}
          handleUpdateForm={handleUpdateForm}
        />
        {members?.length ? (
          <Box>
            <MemberList
              members={members}
              handleMenu={handleMenu}
              setSelectedMember={setSelectedMember}
            />
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

export default MemberDashboard;
