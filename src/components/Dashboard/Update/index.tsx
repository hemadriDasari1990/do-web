import {
  ALPHA_NUMERIC_WITH_SPACE,
  ONLY_NUMBERS,
  allow,
} from "../../../util/regex";
import { MAX_CHAR_COUNT, MAX_NAME_COUNT } from "../../../util/constants";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useBoard, useBoardUpdateLoading } from "../../../redux/state/board";

import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import ColorlibStepIcon from "./StepLibIcon";
import DoSnackbar from "../../Snackbar/components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loader from "../../Loader/components";
import Popover from "@material-ui/core/Popover";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { addProjectToStore } from "../../../redux/actions/project";
import { getTeams } from "../../../redux/actions/team";
import { replaceStr } from "../../../util";
import { updateBoard } from "../../../redux/actions/board";
import { useDefaultSections } from "../../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../../redux/state/login";
import { useSocket } from "../../../redux/state/socket";
import { useTeam } from "../../../redux/state/team";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

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
      width: "100%",
    },
  },
  stepperStyle: {
    "&.MuiPaper-root": {
      // backgroundColor: "#f8f9fa",
    },
  },
  popoverStyle: {
    pointerEvents: "auto",
  },
  paperStyle: {
    marginTop: 10,
    width: 350,
    padding: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select Project", "Board details", "Invite Team (Optional)"];
}

const Update = React.memo(() => {
  const {
    textFieldStyle,
    dropdownInputStyle,
    stepperStyle,
    popoverStyle,
    paperStyle,
  } = useStyles();
  const dispatch = useDispatch();

  /* Redux hooks */
  const { userId } = useLogin();
  const { teams: teamsList } = useTeam();
  const { loading } = useBoardUpdateLoading();
  const { board } = useBoard();
  const history = useHistory();
  const { socket } = useSocket();
  const { defaultSections } = useDefaultSections();

  /* Local state */
  const [apiCalled, setApiCalled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const stepsList = getSteps();
  const [steps, setSteps] = useState(stepsList);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: "",
    noOfSections: "",
    status: "",
    teams: [],
    defaultSection: "",
    project: "",
    projectDescription: "",
    isAnonymous: false,
    name: "",
  });
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [projectDescriptionCount, setProjectDescriptionCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>([]);
  const {
    description,
    noOfSections,
    teams,
    defaultSection,
    project,
    projectDescription,
    isAnonymous,
    name,
  } = formData;

  /* React Hooks */
  useEffect(() => {
    dispatch(getTeams(userId, "", 0, 100));
    socket.emit("get-projects", userId);
  }, []);

  useEffect(() => {
    if (!loading && board && board._id && apiCalled) {
      dispatch(addProjectToStore(board?.project));
      history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
      setFormData({});
      setApiCalled(false);
      setShowError(false);
    }
    if (!loading && board && board.errorId && apiCalled) {
      setShowError(true);
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
  }, [projects]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    if (event.target.name === "description") {
      const charCount = event.target.value.length;
      setDescriptionCount(charCount);
    }

    if (event.target.name === "projectDescription") {
      const charCount = event.target.value.length;
      setProjectDescriptionCount(charCount);
    }
  };

  const handleStartRetro = () => {
    setApiCalled(false);
    dispatch(
      updateBoard({
        description,
        projectDescription,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        status: "new",
        teams: teams?.map((team: { [Key: string]: any }) => team?._id),
        defaultSection,
        isAnonymous,
        name: name,
        ...(project?._id
          ? { projectId: project?._id }
          : { projectTitle: project }),
      })
    );
    setApiCalled(true);
  };

  const handleTeam = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, teams: [data] });
  };

  const handleDefaultSection = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, defaultSection: data?.name });
  };

  const removeItem = (items: Array<string>, i: number) =>
    items.slice(0, i - 1).concat(items.slice(i, items.length));

  const handleIsAnonymous = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAnonymous) {
      setSteps(removeItem(steps, 3));
    }
    if (isAnonymous) {
      setSteps(stepsList);
    }
    setFormData({ ...formData, isAnonymous: !isAnonymous });
  };

  const handleProject = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, project: data });
  };

  const handleSnackbarClose = () => {
    setShowError(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={showError}
        status="error"
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {board?.message}
        </Typography>
      </DoSnackbar>
    );
  };

  const renderAnonymous = () => {
    return (
      <Box mt={1} mb={-3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAnonymous}
              onChange={handleIsAnonymous}
              value="false"
              color="primary"
              name="isAnonymous"
            />
          }
          label={<Typography variant="h6">Create Anonymous Board</Typography>}
        />
      </Box>
    );
  };

  const renderProject = () => {
    return (
      <Box>
        <DoAutoComplete
          defaultValue={project}
          multiple={false}
          isFreeSolo={true}
          textInputLabel="Select or add project"
          textInputPlaceholder="Select or add new project"
          optionKey="name"
          options={projects || []}
          onChange={(e: any, data: { [Key: string]: any }) =>
            handleProject(data)
          }
          customClass={dropdownInputStyle}
        />
        {!project?._id && (
          <Box>
            <TextField
              name="projectDescription"
              id="projectDescription"
              label="Project Description (Optional)"
              placeholder="Enter description about project"
              value={projectDescription}
              onChange={handleInput}
              className={textFieldStyle}
              onKeyPress={(event: React.KeyboardEvent<any>) =>
                allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
              }
              onCut={handlePrevent}
              onCopy={handlePrevent}
              onPaste={handlePrevent}
            />
            <Typography variant="subtitle2">
              {projectDescriptionCount}/{MAX_CHAR_COUNT} chars
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const renderNoOfSections = () => {
    return (
      <Box>
        <TextField
          name="noOfSections"
          id="noOfSections"
          label="Number Of Sections"
          placeholder="Enter no of senctions"
          value={noOfSections}
          onChange={handleInput}
          className={textFieldStyle}
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ONLY_NUMBERS, 1)
          }
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
      </Box>
    );
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderProject();
      case 1:
        return renderBoard();
      case 2:
        return renderTeam();
      default:
        return "Unknown step";
    }
  };

  const renderBoard = () => {
    return (
      <>
        <Box>
          <TextField
            name="name"
            id="name"
            label="Name"
            placeholder="Enter name of the board"
            value={name}
            onChange={handleInput}
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_NAME_COUNT)
            }
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
            required
          />
        </Box>
        {renderAnonymous()}
        {!noOfSections && (
          <Box>
            <DoAutoComplete
              textInputLabel="Select Default Template"
              textInputPlaceholder="Select Default Template"
              optionKey="name"
              options={defaultSections}
              onChange={(e: any, data: { [Key: string]: any }) =>
                handleDefaultSection(data)
              }
              className={dropdownInputStyle}
              // disabled={selectedBoard?._id}
            />
          </Box>
        )}
        {!defaultSection && renderNoOfSections()}
        {noOfSections ? (
          <Box mt={3}>
            <HintMessage message="Please note System will generate default sections with name 'Section Title' based on number of sections you specify and you need to update them manually once board is created and before starting the session." />
          </Box>
        ) : null}
        <Box>
          <TextField
            name="description"
            id="description"
            label="Description (Optional)"
            placeholder="Enter description about this board"
            value={description}
            onChange={handleInput}
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
            }
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
          />
          <Typography variant="subtitle2">
            {" "}
            {descriptionCount}/{MAX_CHAR_COUNT} chars
          </Typography>
        </Box>
      </>
    );
  };

  const renderTeam = () => {
    return (
      <Box>
        <DoAutoComplete
          defaultValue={teams}
          textInputLabel="Invite Team"
          textInputPlaceholder="Select team"
          optionKey="name"
          options={teamsList}
          onChange={(e: any, data: { [Key: string]: any }) => handleTeam(data)}
          customClass={dropdownInputStyle}
        />
      </Box>
    );
  };

  const disableButton = () => {
    if (activeStep === 0 && !project) {
      return true;
    }
    if (
      activeStep === 1 &&
      !defaultSection &&
      (!noOfSections || noOfSections === 0)
    ) {
      return true;
    }
    return false;
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "quick-start-popover" : undefined;

  return (
    <React.Fragment>
      <QuickRetroButton handlePopoverOpen={handlePopoverOpen} id={id} />

      {renderSnackbar()}
      <Popover
        id={id}
        className={popoverStyle}
        classes={{
          paper: paperStyle,
        }}
        // disableEnforceFocus={true}
        open={open}
        // anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 60, left: 2000 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        // disableRestoreFocus
      >
        <>
          <Loader enable={loading} backdrop={true} />
          <Box mb={2} ml={1.5}>
            <Typography variant="h3">
              Quick Start Retro (2 or 3 steps)
            </Typography>
          </Box>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={stepperStyle}
            id="start-quick-retro"
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography variant="h5">{label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <Box display="flex" mt={2}>
                    {activeStep !== 0 ? (
                      <Box mr={1}>
                        <Button onClick={handleBack}>Back</Button>
                      </Box>
                    ) : null}
                    {activeStep === steps.length - 1 ||
                    (activeStep === steps.length - 1 && isAnonymous) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartRetro()}
                        startIcon={<PlayArrowIcon color="secondary" />}
                        disabled={disableButton()}
                      >
                        <Typography variant="h6" color="secondary">
                          Start
                        </Typography>
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={disableButton()}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </>
      </Popover>
    </React.Fragment>
  );
});

const QuickRetroButton = React.memo((props: any) => {
  const { handlePopoverOpen, id } = props;

  return (
    <Button
      id={id}
      variant="contained"
      color="primary"
      startIcon={<PlayArrowIcon />}
      onClick={handlePopoverOpen}
      // onMouseLeave={handlePopoverClose}
      aria-owns={id}
      aria-describedby={id}
      aria-haspopup="true"
    >
      <Typography variant="subtitle1" color="secondary">
        Quick Start Retro
      </Typography>
    </Button>
  );
});

export default Update;
