import React, { useEffect, useState, useCallback } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { getTeams } from "../../../redux/actions/team";
import { updateBoard } from "../../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";
import { useTeam } from "../../../redux/state/team";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useBoardLoading } from "../../../redux/state/board";
import socket from "../../../socket";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import Loader from "../../Loader/components";

const HintMessage = React.lazy(() => import("../../HintMessage"));
const DoAutoComplete = React.lazy(() => import("../../common/DoAutoComplete"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
  dropdownInputStyle: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "53%",
    },
  },
}));

const Update = () => {
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();

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

  const handleStartRetro = () => {
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

  const handleTeams = (data: Array<{ [Key: string]: any }>) => {
    setFormData({ ...formData, teams: data });
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

  const renderProject = useCallback(() => {
    return (
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
        />
      </Box>
    );
  }, [departmentId]);

  const renderTitle = useCallback(() => {
    return (
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
    );
  }, [project, isSystemName]);

  return (
    <React.Fragment>
      <Loader enable={loading} />
      <Box>
        <Typography variant="h2">Start Retro</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
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
          />
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
          {departmentId && renderProject()}
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
          {project?._id && !isSystemName && renderTitle()}
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
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
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
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
          {isDefaultBoard || noOfSections ? (
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
          ) : null}
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
          {isDefaultBoard || noOfSections ? (
            <Box>
              <DoAutoComplete
                defaultValue={teams}
                multiple={true}
                textInputLabel="Select your Team/Teams"
                textInputPlaceholder="Select multiple teams"
                optionKey="name"
                options={teamsList}
                onInputChange={(e: any, data: Array<{ [Key: string]: any }>) =>
                  handleTeams(data)
                }
                customClass={dropdownInputStyle}
              />
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <Box mr={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStartRetro()}
            startIcon={<PlayArrowOutlinedIcon color="secondary" />}
            disabled={disableButton()}
          >
            <Typography variant="h6" color="secondary">
              Start Retro
            </Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Update;
