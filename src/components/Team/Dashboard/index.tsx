import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoSearch from "../../common/search";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { MEMBERS_LIST } from "../../../routes/config";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteTeam } from "../../../redux/actions/team";
import formateNumber from "../../../util/formateNumber";
import { getTeams } from "../../../redux/actions/team";
import { replaceStr } from "../../../util";
import useDebounce from "../../common/useDebounce";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../../redux/state/login";
import { useProjectLoading } from "../../../redux/state/project";
import useStyles from "../../styles";
import { useTeam } from "../../../redux/state/team";
import { useUser } from "../../../redux/state/user";

const TeamList = React.lazy(() => import("../List"));
const UpdateTeam = React.lazy(() => import("../Update"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));

const TeamDashboard = () => {
  const { root, buttonStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { team, teams: teamsList } = useTeam();
  const { user } = useUser();
  const { loading } = useProjectLoading();
  const { userId } = useLogin();
  const { totalTeams: totalTeamsCount } = useTeam();

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
  const [queryString, setQueryString] = useState("");
  const debouncedValue = useDebounce(queryString, 500);

  /* React Hooks */
  const loadTeams = (searchValue: string) => {
    dispatch(getTeams(userId, searchValue, 0, 15));
  };

  useEffect(() => {
    loadTeams(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setTotalTeams(totalTeamsCount || 0);
  }, [totalTeamsCount]);

  useEffect(() => {
    if (teamsList) {
      setShowTeamForm(false);
      setTeams(teamsList);
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
      setTotalTeams(totalTeams - 1);
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
        teamData.name = team.name;
        teamData.description = team.description;
        teamsList[teamIndex] = teamData;
        setTeams(teamsList);
      } else {
        setTeams((currentTeams: Array<{ [Key: string]: any }>) => [
          team,
          ...currentTeams,
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
            Are you sure you want to delete {selectedTeam?.name}?
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
        <Hidden only={["xs", "md", "sm"]}>
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

        <Hidden only={["xl", "lg"]}>
          <Tooltip title="Create New Team" placement="bottom" arrow>
            <Fab color="primary" onClick={() => handleCreateNewTeam()}>
              <GroupAddOutlinedIcon color="primary" />
            </Fab>
          </Tooltip>
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

  const handleSearch = (value: string) => {
    setQueryString(value);
  };

  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderSnackbar()}
      {renderAddMembersModal()}
      <Box className={root}>
        <Box pb={2}>
          <Grid container spacing={2}>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h2">
                    {user?.name}&nbsp;({formateNumber(totalTeams) || 0})
                  </Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">
                    {user?.name}&nbsp;({formateNumber(totalTeams) || 0})
                  </Typography>
                </Hidden>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={12} sm={6}>
              <Box>
                <DoSearch
                  placeHolder="Search teams by name"
                  handleSearch={handleSearch}
                />
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box display="flex" justifyContent={"flex-end"}>
                <Hidden only={["xl", "lg"]}>
                  <Tooltip
                    title="Go Back To Previous Page"
                    placement="bottom"
                    arrow
                  >
                    <Fab color="primary" onClick={() => handleBack()}>
                      <KeyboardBackspaceOutlinedIcon color="primary" />
                    </Fab>
                  </Tooltip>
                </Hidden>
                <Hidden only={["xs", "sm", "md"]}>
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
                <Box ml={2} className={buttonStyle}>
                  {renderCreateNewTeam()}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <UpdateTeam
          selectedTeam={selectedTeam}
          openDialog={showTeamForm}
          handleUpdateForm={handleUpdateForm}
        />
        <Box>
          <TeamList
            teams={teams}
            handleMenu={handleMenu}
            setSelectedTeam={setSelectedTeam}
            handleAddMember={handleAddMember}
            totalTeams={totalTeams}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TeamDashboard;
