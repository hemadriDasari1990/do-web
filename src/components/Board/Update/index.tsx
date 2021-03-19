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
import { useParams } from "react-router";
import { useTeam } from "../../../redux/state/team";
import { Typography } from "@material-ui/core";
import { TEAM } from "../../../routes/config";
import { useHistory } from "react-router";
import Link from "@material-ui/core/Link";

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
  const { openDialog, handleUpdateForm, selectedBoard } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { projectId } = useParams<{ projectId: string }>();
  const { userId } = useLogin();
  const { team, teams: teamsList } = useTeam();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: "",
    description: "",
    noOfSections: 0,
    sprint: 0,
    status: "",
    teams: [],
  });
  const { title, description, noOfSections, sprint, status, teams } = formData;

  /* React Hooks */
  useEffect(() => {
    if (selectedBoard && selectedBoard._id) {
      setFormData({
        ...formData,
        title: selectedBoard.title,
        description: selectedBoard.description,
        boardId: selectedBoard._id,
        status: selectedBoard.status,
        noOfSections: selectedBoard.totalSections,
        sprint: selectedBoard.sprint,
        teams: selectedBoard.teams,
      });
    }
    if (!selectedBoard?._id) {
      setFormData({});
    }
  }, [selectedBoard]);

  useEffect(() => {
    dispatch(getTeams(userId));
  }, []);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
    setFormData({
      title,
      description,
      noOfSections: 0,
      sprint: 0,
      status: "",
      teams: [],
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateBoard({
        title,
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        sprint: sprint ? parseInt(sprint) : 0,
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
        sprint: sprint ? parseInt(sprint) : 0,
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
    if (!description?.trim().length) {
      return true;
    }

    if (!noOfSections || noOfSections === 0) {
      return true;
    }

    if (!sprint || sprint === 0) {
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
    if (!description?.trim().length) {
      return true;
    }

    if (!noOfSections || noOfSections === 0) {
      return true;
    }

    if (!sprint || sprint === 0) {
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

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Board"
        pcta="Save"
        scta="Save as draft"
        handleSave={handleSubmit}
        handleSecondarySubmit={handleSecondarySubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        disableSecondaryCTA={disableSecondaryButton()}
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
        <Box>
          <TextField
            name="description"
            id="description"
            label="Description"
            placeholder="Enter description of the board"
            value={description}
            onChange={handleInput}
            required
            className={textFieldStyle}
          />
        </Box>
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
        <Box mt={3}>
          <Typography variant="h3">
            Wanna create a team?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => handleViewTeams()}
            >
              <Typography variant="body1" color="primary">
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
