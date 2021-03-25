import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import ScrumBoard from "../../../assets/board.svg";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { getTeams } from "../../../redux/actions/team";
import { updateBoard } from "../../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";
import { useTeam } from "../../../redux/state/team";
import { Typography } from "@material-ui/core";
import { TEAM } from "../../../routes/config";
import { useHistory } from "react-router";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useBoardLoading } from "../../../redux/state/board";
import socket from "../../../socket";
import Slide from "@material-ui/core/Slide";

const HintMessage = React.lazy(() => import("../../HintMessage"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const DoAutoComplete = React.lazy(() => import("../../common/DoAutoComplete"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
  dropdownInputStyle: {
    width: "75%",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "53%",
    },
  },
}));

const Update = (props: any) => {
  const {
    openDialog,
    handleUpdateForm,
    selectedBoard,
    title: boardTitle,
    hideSaveAsDraft,
  } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { userId } = useLogin();
  const { teams: teamsList } = useTeam();
  const { loading } = useBoardLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: "",
    description: "",
    noOfSections: 0,
    status: "",
    teams: [],
    isSystemName: false,
    isDefaultBoard: false,
    departmentId: "",
    project: "",
  });
  const [departments, setDepartments] = useState<Array<{ [Key: string]: any }>>(
    []
  );
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>([]);
  const {
    description,
    noOfSections,
    status,
    teams,
    title,
    isSystemName,
    isDefaultBoard,
    departmentId,
    project,
  } = formData;

  /* React Hooks */
  useEffect(() => {
    dispatch(getTeams(userId));
    socket.emit("get-departments", userId);
  }, []);

  useEffect(() => {
    socket.on(
      "get-departments-response",
      (departments: Array<{ [Key: string]: any }>) => {
        setDepartments(departments);
      }
    );
    return () => {
      socket.off("get-departments-response");
    };
  }, [userId, departments]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
    setFormData({
      description,
      noOfSections: 0,
      status: "",
      teams: [],
      title: "",
      isSystemName: false,
      isDefaultBoard: false,
      departmentId: "",
      project: "",
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateBoard({
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        status: "pending",
        teams: teams?.map((team: { [Key: string]: any }) => team._id),
        title,
        isSystemName,
        isDefaultBoard,
        departmentId,
        projectId: project?._id,
      })
    );
  };

  const disableButton = () => {
    if (!isSystemName && !title?.trim().length) {
      return true;
    }

    if (!isDefaultBoard && (!noOfSections || noOfSections === 0)) {
      return true;
    }

    return false;
  };

  const disableSecondaryButton = () => {
    if (selectedBoard?._id) {
      return true;
    }

    if (!isSystemName && !title?.trim().length) {
      return true;
    }

    if (!isDefaultBoard && (!noOfSections || noOfSections === 0)) {
      return true;
    }

    if (status && status === "draft") {
      return true;
    }
    return false;
  };

  const handleTeams = (data: Array<{ [Key: string]: any }>) => {
    setFormData({ ...formData, teams: data });
  };

  const handleViewTeams = () => {
    history.push(TEAM);
  };

  const handleGenerateSystemName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, isSystemName: !isSystemName });
  };

  const handleDefaultRetroBoard = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, isDefaultBoard: !isDefaultBoard });
  };

  const handleDepartment = (data: any) => {
    setFormData({ ...formData, departmentId: data?._id || data?.title });
    setProjects(data?.projects);
  };

  const handleProject = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, project: data });
  };

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={openDialog}
        title={boardTitle || "Create or Update Board"}
        pcta="Save"
        scta="Save as draft"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        disableSecondaryCTA={disableSecondaryButton()}
        hideSecondary={hideSaveAsDraft}
        maxWidth={440}
        loading={loading}
      >
        {/* <Loader backdrop={true} enable={loading} /> */}
        <Hidden only={["xs"]}>
          <Box mt={5} textAlign="center">
            <Zoom in={true} timeout={2000}>
              <img src={ScrumBoard} height="200px" width="fit-content" />
            </Zoom>
          </Box>
        </Hidden>
        <Box>
          <DoAutoComplete
            defaultValue={null}
            multiple={false}
            textInputLabel="Select your Department"
            textInputPlaceholder="Select or enter & add new department"
            optionKey="title"
            options={departments || []}
            onInputChange={(e: any, data: { [Key: string]: any }) =>
              handleDepartment(data)
            }
            customClass={dropdownInputStyle}
            isFreeSolo
            // disabled={selectedBoard?._id}
          />
        </Box>
        {departmentId && (
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <DoAutoComplete
                defaultValue={null}
                multiple={false}
                textInputLabel="Select your Project"
                textInputPlaceholder="Select or add new project"
                optionKey="title"
                options={projects || []}
                onInputChange={(e: any, data: { [Key: string]: any }) =>
                  handleProject(data)
                }
                customClass={dropdownInputStyle}
                isFreeSolo
                // disabled={selectedBoard?._id}
              />
            </Box>
          </Slide>
        )}

        {project?._id && !isSystemName && (
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <TextField
                name="title"
                id="title"
                label="Title"
                placeholder="Enter title of the board"
                value={title}
                onChange={handleInput}
                required
                className={textFieldStyle}
              />
            </Box>
          </Slide>
        )}
        {project?._id && (
          <Box mt={1} mb={-3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSystemName}
                  onChange={handleGenerateSystemName}
                  value="false"
                  color="primary"
                  name="isSystemName"
                />
              }
              label={<Typography variant="h6">Auto generate name</Typography>}
            />
          </Box>
        )}
        {project?._id && isSystemName && (
          <Box mt={3}>
            <HintMessage
              message={`System will generate name Retro ${
                project?.boards?.length ? project?.boards?.length + 1 : 1
              }`}
            />
          </Box>
        )}
        {(title || isSystemName) && (
          <>
            {!isDefaultBoard && (
              <Box>
                <TextField
                  name="noOfSections"
                  id="noOfSections"
                  label="Number Of Sections"
                  placeholder="Enter no of senctions"
                  value={noOfSections}
                  onChange={handleInput}
                  required
                  className={textFieldStyle}
                />
              </Box>
            )}
            {noOfSections ? (
              <Box mt={3}>
                <HintMessage message="Please note System will generate default sections with name 'Section title' based on number of sections you specify and you need to update them manually once board is created and before starting the session." />
              </Box>
            ) : null}
            {!noOfSections ? (
              <Box mt={1} mb={-3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDefaultBoard}
                      onChange={handleDefaultRetroBoard}
                      value="false"
                      color="primary"
                      name="isDefaultBoard"
                    />
                  }
                  label={
                    <Typography variant="h6">Create default Board</Typography>
                  }
                />
              </Box>
            ) : null}
            {isDefaultBoard && (
              <Box mt={3}>
                <HintMessage message="System will generate default board with sections like What went well, What could have been better, What to stop, What to start, New Learnings, Recognitions and Action Items." />
              </Box>
            )}
          </>
        )}
        {isDefaultBoard ||
          (noOfSections ? (
            <>
              <Box>
                <TextField
                  name="description"
                  id="description"
                  label="Description"
                  placeholder="Enter description about this board"
                  value={description}
                  onChange={handleInput}
                  className={textFieldStyle}
                />
              </Box>
              <Box>
                <DoAutoComplete
                  defaultValue={teams}
                  multiple={true}
                  textInputLabel="Select your Team/Teams"
                  textInputPlaceholder="Select multiple teams"
                  optionKey="name"
                  options={teamsList}
                  onInputChange={(
                    e: any,
                    data: Array<{ [Key: string]: any }>
                  ) => handleTeams(data)}
                  customClass={dropdownInputStyle}
                  disabled={selectedBoard?._id}
                />
              </Box>
            </>
          ) : null)}

        <Box mt={3}>
          <Typography variant="h5">
            If you want to create a team please{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => handleViewTeams()}
            >
              <Typography variant="h5" color="primary">
                &nbsp;Click here
              </Typography>
            </Link>
          </Typography>
        </Box>
      </ResponsiveDialog>
    </React.Fragment>
  );
};

export default Update;
