import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { MEMBERS_LIST } from "../../../routes/config";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteTeam } from "../../../redux/actions/team";
import { getTeams } from "../../../redux/actions/team";
import { replaceStr } from "../../../util";
import { useDepartmentLoading } from "../../../redux/state/department";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../../redux/state/login";
import useStyles from "../../styles";
import { useTeam } from "../../../redux/state/team";
import { useUser } from "../../../redux/state/user";

const TeamList = React.lazy(() => import("../List"));
const NoRecords = React.lazy(() => import("../../NoRecords"));
const UpdateTeam = React.lazy(() => import("../Update"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const Loader = React.lazy(() => import("../../Loader/components"));
const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));

const TeamDashboard = () => {
  const {
    root,
    countStyle,
    countTextStyle,
    buttonStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { team, teams: teamsList } = useTeam();
  const { user } = useUser();
  const { loading } = useDepartmentLoading();
  const { userId } = useLogin();

  /* React local states */
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [totalTeams, setTotalTeams] = useState(0);
  const [teams, setTeams] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<{
    [Key: string]: any;
  }>({});
  const [openError, setOpenError] = useState(false);

  /* React Hooks */
  useEffect(() => {
    dispatch(getTeams(userId));
  }, []);

  useEffect(() => {
    if (teamsList) {
      setShowTeamForm(false);
      setTeams(teamsList);
      setTotalTeams(teamsList?.length);
    }
  }, [teamsList]);

  useEffect(() => {
    if (!openError && !loading && team?.errorId) {
      setOpenError(true);
    }
    if (!loading && team?.deleted) {
      const teamsList = teams.filter(
        (d: { [Key: string]: any }) => d._id !== selectedTeam._id
      );
      setTotalTeams(teamsList?.length);
      setTeams(teamsList);
      setSelectedTeam({});
      handleCloseDeleteDialog();
    }

    if (!loading && team?._id) {
      const teamsList = [...teams];
      const teamIndex = teamsList.findIndex(
        (p: { [Key: string]: any }) => p._id === team._id
      );
      const teamData = teams[teamIndex];
      if (teamData) {
        teamData.title = team.title;
        teamData.description = team.description;
        teamsList[teamIndex] = teamData;
        setTeams(teamsList);
      } else {
        setTeams((currentTeams: Array<{ [Key: string]: any }>) => [
          ...currentTeams,
          team,
        ]);
        setTotalTeams(totalTeams + 1);
      }
      setSelectedTeam({});
      setShowTeamForm(false);
    }
  }, [loading, team]);

  /* Handler functions */

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCreateNewTeam = () => {
    setSelectedTeam({});
    setShowTeamForm(true);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleMenu = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    val: string
  ) => {
    switch (val) {
      case "edit":
        setShowTeamForm(true);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      case "add-member":
        redirectToMembers(selectedTeam);
        break;
      default:
        break;
    }
  };

  const handleAddMember = (team: { [Key: string]: any }) => {
    setSelectedTeam(team);
    redirectToMembers(team);
  };

  const redirectToMembers = (team: { [Key: string]: any }) => {
    history.push(replaceStr(MEMBERS_LIST, ":teamId", team?._id));
  };

  const handleAddMembers = () => {};

  const renderAddMembersModal = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Team"
        pcta="Save"
        handleSave={handleAddMembers}
        handleClose={handleClose}
        // disablePrimaryCTA={disableButton()}
        maxWidth={440}
      ></ResponsiveDialog>
    );
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
            Are you sure you want to delete {selectedTeam?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleDelete = () => {
    dispatch(deleteTeam(selectedTeam._id));
    setOpenDeleteDialog(false);
  };

  const renderCreateNewTeam = () => {
    return (
      <>
        <Hidden only={["xs"]}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<GroupAddOutlinedIcon color="secondary" />}
            onClick={() => handleCreateNewTeam()}
          >
            <Typography color="secondary" variant="subtitle1">
              Create New Team
            </Typography>
          </Button>
        </Hidden>

        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            className={iconBackStyle}
            onClick={() => handleCreateNewTeam()}
          >
            <GroupAddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
      </>
    );
  };

  const handleUpdateForm = () => {
    setShowTeamForm(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenDialog(false);
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
          {team?.message}
        </Typography>
      </DoSnackbar>
    );
  };
  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderSnackbar()}
      {renderAddMembersModal()}
      <Loader enable={loading} />
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xl={teams?.length ? 8 : 8}
              lg={teams?.length ? 8 : 8}
              md={teams?.length ? 6 : 6}
              sm={12}
              xs={12}
            >
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h2">{user?.name}</Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">{user?.name}</Typography>
                </Hidden>
                <Tooltip arrow title="Total Teams">
                  <Box ml={2} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>
                      {totalTeams || 0}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" justifyContent={"flex-end"}>
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
                        Go Back To Previous Page
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {teams?.length ? (
                  <Box ml={2} className={buttonStyle}>
                    {renderCreateNewTeam()}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!teams || !teams?.length) ? (
          <Box mt={10}>
            <NoRecords message="No Teams found! Please add" />
            <Box mt={5} textAlign="center">
              {renderCreateNewTeam()}
            </Box>
          </Box>
        ) : null}
        <UpdateTeam
          selectedTeam={selectedTeam}
          openDialog={showTeamForm}
          handleUpdateForm={handleUpdateForm}
        />
        {teams?.length ? (
          <Box>
            <TeamList
              teams={teams}
              handleMenu={handleMenu}
              setSelectedTeam={setSelectedTeam}
              handleAddMember={handleAddMember}
            />
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

export default TeamDashboard;
