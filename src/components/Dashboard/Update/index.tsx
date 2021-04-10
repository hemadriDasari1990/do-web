import React, { useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useBoard, useBoardLoading } from "../../../redux/state/board";

import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loader from "../../Loader/components";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { addProjectToStore } from "../../../redux/actions/project";
import { getTeams } from "../../../redux/actions/team";
// import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { replaceStr } from "../../../util";
import socket from "../../../socket";
import { updateBoard } from "../../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../../redux/state/login";
import { useTeam } from "../../../redux/state/team";

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
  const { board } = useBoard();
  const history = useHistory();

  /* Local state */
  const [apiCalled, setApiCalled] = useState(false);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: "",
    noOfSections: "",
    status: "",
    teams: [],
    isDefaultBoard: false,
    project: "",
  });
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>([]);
  const {
    description,
    noOfSections,
    teams,
    isDefaultBoard,
    project,
  } = formData;

  /* React Hooks */
  useEffect(() => {
    dispatch(getTeams(userId, "", 0, 15));
    socket.emit("get-projects", userId);
  }, []);

  useEffect(() => {
    if (!loading && board?._id && apiCalled) {
      dispatch(addProjectToStore(board?.project));
      history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
      setApiCalled(false);
    }
  }, [loading, board, apiCalled]);

  useEffect(() => {
    socket.on(
      "get-projects-response",
      (projects: Array<{ [Key: string]: any }>) => {
        setProjects(projects);
      }
    );
    return () => {
      socket.off("get-projects-response");
    };
  }, [userId, projects]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleStartRetro = () => {
    setApiCalled(false);
    dispatch(
      updateBoard({
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        status: "pending",
        teams: teams?.map((team: { [Key: string]: any }) => team._id),
        isDefaultBoard,
        title: "Retro " + (project?.boards?.length + 1),
        ...(project?._id
          ? { projectId: project?._id }
          : { projectTitle: project }),
      })
    );
    setFormData({});
    setApiCalled(true);
  };

  const disableButton = () => {
    if (!isDefaultBoard && (!noOfSections || noOfSections === 0)) {
      return true;
    }
    return false;
  };

  const handleTeams = (data: Array<{ [Key: string]: any }>) => {
    setFormData({ ...formData, teams: data });
  };

  const handleDefaultRetroBoard = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, isDefaultBoard: !isDefaultBoard });
  };

  const handleProject = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, project: data });
  };

  const renderProject = () => {
    return (
      <Box>
        <DoAutoComplete
          defaultValue={null}
          multiple={false}
          isFreeSolo={true}
          textInputLabel="Select or add project"
          textInputPlaceholder="Select or add new project"
          optionKey="title"
          options={projects || []}
          onChange={(e: any, data: { [Key: string]: any }) =>
            handleProject(data)
          }
          customClass={dropdownInputStyle}
        />
      </Box>
    );
  };

  const renderNoOfSections = useCallback(() => {
    return (
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
    );
  }, [isDefaultBoard, noOfSections]);
  return (
    <React.Fragment>
      <Loader enable={loading} />
      <Box>
        <Typography variant="h3">Start Quick Retro</Typography>
      </Box>
      {renderProject()}

      {project && (
        <Box mt={3}>
          <HintMessage
            message={`System will generate board name Retro ${
              project?.boards?.length ? project?.boards?.length + 1 : 1
            }`}
          />
        </Box>
      )}
      <>
        {!isDefaultBoard && renderNoOfSections()}
        {!isDefaultBoard && noOfSections ? (
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
              label={<Typography variant="h6">Create default Board</Typography>}
            />
          </Box>
        ) : null}
        {isDefaultBoard && (
          <Box mt={3}>
            <HintMessage message="System will generate default board with sections like What went well, What could have been better, What to stop, What to start, New Learnings and Recognitions." />
          </Box>
        )}
      </>
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
          onChange={(e: any, data: Array<{ [Key: string]: any }>) =>
            handleTeams(data)
          }
          customClass={dropdownInputStyle}
        />
      </Box>
      <Box mt={5} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStartRetro()}
          startIcon={<PlayArrowIcon color="secondary" />}
          disabled={disableButton()}
        >
          <Typography variant="h6" color="secondary">
            Start Retro
          </Typography>
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Update;
