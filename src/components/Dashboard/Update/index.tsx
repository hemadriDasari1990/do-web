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
import Slide from "@material-ui/core/Slide";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const DoAutoComplete = React.lazy(() => import("../../common/DoAutoComplete"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
  dropdownInputStyle: {
    width: "80%",
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
    departments,
  } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { userId } = useLogin();
  const { teams: teamsList } = useTeam();
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>([]);

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: "",
    description: "",
    noOfSections: 0,
    status: "",
    teams: [],
    departmentId: "",
    projectId: "",
  });
  const {
    title,
    description,
    noOfSections,
    status,
    teams,
    departmentId,
    projectId,
  } = formData;

  /* React Hooks */

  useEffect(() => {
    if (!teamsList || !teamsList?.length) {
      dispatch(getTeams(userId));
    }
  }, []);

  useEffect(() => {
    if (openDialog) {
      resetData();
    }
  }, [openDialog]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
    resetData();
  };

  const resetData = () => {
    setFormData({
      title: "",
      description: "",
      noOfSections: 0,
      status: "",
      teams: [],
      departmentId: "",
      projectId: "",
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateBoard({
        title,
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        projectId,
        status: status || "pending",
        teams: teams?.map((team: { [Key: string]: any }) => team._id),
      })
    );
  };

  const handleSecondarySubmit = () => {
    dispatch(
      updateBoard({
        title,
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        projectId,
        status: "draft",
        teams: teams?.map((team: { [Key: string]: any }) => team._id),
      })
    );
  };

  const disableButton = () => {
    if (!title?.trim().length) {
      return true;
    }

    if (!noOfSections || noOfSections === 0) {
      return true;
    }

    return false;
  };

  const disableSecondaryButton = () => {
    if (selectedBoard?._id) {
      return true;
    }
    if (!title?.trim().length) {
      return true;
    }

    if (!noOfSections || noOfSections === 0) {
      return true;
    }

    if (status && status === "draft") {
      return true;
    }
    return false;
  };

  const handleDepartment = (data: any) => {
    setFormData({ ...formData, departmentId: data?._id || data?.title });
    setProjects(data?.projects);
  };

  const handleProject = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, projectId: data?._id || data?.title });
  };

  const handleTeams = (data: Array<{ [Key: string]: any }>) => {
    setFormData({ ...formData, teams: data });
  };

  const handleViewTeams = () => {
    history.push(TEAM);
  };

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={openDialog}
        title={boardTitle || "Create or Update Board"}
        pcta="Save"
        scta="Save as draft"
        handleSave={handleSubmit}
        handleSecondarySubmit={handleSecondarySubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        disableSecondaryCTA={disableSecondaryButton()}
        hideSecondary={hideSaveAsDraft}
        maxWidth={440}
      >
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
            options={departments}
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
                textInputPlaceholder="Select or enter & add new project"
                optionKey="title"
                options={projects}
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

        {projectId && (
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
        {title && (
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <TextField
                name="description"
                id="description"
                label="Description"
                placeholder="Enter description of the board"
                value={description}
                onChange={handleInput}
                className={textFieldStyle}
              />
            </Box>
          </Slide>
        )}
        {title && (
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <TextField
                name="noOfSections"
                id="noOfSections"
                label="Number Of Sections"
                placeholder="Enter no of senctions"
                value={noOfSections}
                onChange={handleInput}
                disabled={selectedBoard?.totalSections}
                required
                className={textFieldStyle}
              />
            </Box>
          </Slide>
        )}
        {/* {noOfSections ? (
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <TextField
                name="sprint"
                id="sprint"
                label="Which Sprint"
                placeholder="Enter your sprint number"
                value={sprint}
                onChange={handleInput}
                required
                className={textFieldStyle}
              />
            </Box>
          </Slide>
        ) : null} */}
        {noOfSections ? (
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <DoAutoComplete
                defaultValue={teams}
                multiple={true}
                textInputLabel="Select your Team"
                textInputPlaceholder="Select multiple"
                optionKey="name"
                options={teamsList}
                onInputChange={(e: any, data: Array<{ [Key: string]: any }>) =>
                  handleTeams(data)
                }
                customClass={dropdownInputStyle}
                disabled={selectedBoard?._id}
              />
            </Box>
          </Slide>
        ) : null}
        {/* <Box>
          <TextareaAutosize
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
          />
        </Box> */}
        <Box mt={3}>
          <Typography variant="h5">
            Wanna create a team?{" "}
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
