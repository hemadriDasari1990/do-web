import {
  ALPHA_NUMERIC_WITH_SPACE,
  ONLY_NUMBERS,
  allow,
} from "../../../util/regex";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import BoardIcon from "../../../assets/board";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Loader from "../../Loader/components";
import { MAX_CHAR_COUNT } from "../../../util/constants";
import { TEAM } from "../../../routes/config";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { getRemainingCharLength } from "../../../util";
import { getTeams } from "../../../redux/actions/team";
import { updateBoard } from "../../../redux/actions/board";
import { useBoardUpdateLoading } from "../../../redux/state/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../../redux/state/login";
import { useProject } from "../../../redux/state/project";
import { useTeam } from "../../../redux/state/team";

const HintMessage = React.lazy(() => import("../../HintMessage"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
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

const Update = (props: any) => {
  const {
    openDialog,
    handleUpdateForm,
    selectedBoard,
    title: boardName,
    totalBoards,
  } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { project } = useProject();

  /* Redux hooks */
  const { userId, accountType } = useLogin();
  const { loading } = useBoardUpdateLoading();
  const { teams: teamsList } = useTeam();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: "",
    noOfSections: 0,
    status: "",
    team: null,
    isDefaultBoard: false,
  });
  const [count, setCount] = useState(0);
  const { description, noOfSections, status, team, isDefaultBoard } = formData;

  /* React Hooks */
  useEffect(() => {
    if (selectedBoard && selectedBoard._id) {
      setFormData({
        ...formData,
        description: selectedBoard.description,
        boardId: selectedBoard._id,
        status: selectedBoard.status,
        noOfSections: selectedBoard.totalSections,
        team: selectedBoard.teams?.length ? selectedBoard.teams[0] : null,
        isDefaultBoard: selectedBoard.isDefaultBoard,
      });
    }
    if (!selectedBoard?._id) {
      setFormData({});
    }
  }, [selectedBoard]);

  useEffect(() => {
    dispatch(getTeams(userId, "", 0, 5));
  }, []);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "description") {
      const charCount = event.target.value.length;
      const charLeft = getRemainingCharLength(MAX_CHAR_COUNT, charCount);
      setCount(charLeft);
    }
  };

  const handleClose = () => {
    handleUpdateForm();
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      description: "",
      noOfSections: 0,
      status: "",
      team: [],
      isDefaultBoard: false,
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateBoard({
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        status: status || "new",
        teams: [team?._id],
        isDefaultBoard,
        projectId: project?._id,
        accountType,
        name: "Board " + (totalBoards + 1),
        boardId: selectedBoard?._id,
      })
    );
    // resetFormData();
  };

  const disableButton = () => {
    if (!isDefaultBoard && (!noOfSections || noOfSections === 0)) {
      return true;
    }

    return false;
  };

  const handleTeams = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, team: data });
  };

  const handleViewTeams = () => {
    history.push(TEAM);
  };

  const handleDefaultRetroBoard = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, isDefaultBoard: !isDefaultBoard });
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={openDialog}
        title={boardName || "Create or Update Board"}
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Loader backdrop={true} enable={loading} />
        <Hidden only={["xs"]}>
          <Box mt={5} textAlign="center">
            <Zoom in={true} timeout={2000}>
              <BoardIcon
                stickyNoteColor="#ffc800"
                stickyNoteColor1="#fd7171"
                stickyNoteColor2="#7b68ee"
                stickyNoteColor3="#49ccf9"
                stickyNoteColor4="#00b884"
                hairColor="#2f2e41"
                borderColor="#2f2e41"
                primarySkinColor="#ffb8b8"
                secondarySkinColor="#a0616a"
                shoeColor="#2f2e41"
                shirtColor="#cccccc"
                cornerCircleColor="#cccccc"
                width={281}
                height={200}
              />
            </Zoom>
          </Box>
        </Hidden>
        <Box mt={3}>
          <HintMessage
            message={
              selectedBoard?._id
                ? `System generated name ${selectedBoard?.name}`
                : `System will generate name Board ${
                    totalBoards ? totalBoards + 1 : 1
                  }`
            }
          />
        </Box>
        {!isDefaultBoard && (
          <Box>
            <TextField
              name="noOfSections"
              id="noOfSections"
              label="Number Of Sections"
              placeholder="Enter no of senctions"
              value={noOfSections}
              onChange={handleInput}
              disabled={!!selectedBoard?.totalSections}
              required
              className={textFieldStyle}
              onKeyPress={(event: React.KeyboardEvent<any>) =>
                allow(event, ONLY_NUMBERS, 2)
              }
              onCut={handlePrevent}
              onCopy={handlePrevent}
              onPaste={handlePrevent}
            />
          </Box>
        )}
        {!isDefaultBoard && noOfSections ? (
          <Box mt={3}>
            <HintMessage message="Please note System will generate default sections with name 'Section name' based on number of sections you specify and you need to update them manually once board is created and before starting the session." />
          </Box>
        ) : null}
        <Box mt={1} mb={-3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDefaultBoard}
                onChange={handleDefaultRetroBoard}
                value="false"
                color="primary"
                name="isDefaultBoard"
                disabled={selectedBoard?._id && isDefaultBoard}
              />
            }
            label={<Typography variant="h6">Create default Board</Typography>}
          />
        </Box>
        {!selectedBoard?._id && isDefaultBoard && (
          <Box mt={3}>
            <HintMessage message="System will generate default board with sections like What went well, What could have been better, What to stop, What to start, New Learnings, Recognitions and action items." />
          </Box>
        )}
        <Box>
          <TextField
            name="description"
            id="description"
            label="Description"
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
          <Typography variant="subtitle2">{count} chars</Typography>
        </Box>
        <Box>
          <DoAutoComplete
            defaultValue={team}
            // multiple={true}
            textInputLabel="Invite Team"
            textInputPlaceholder="Select team"
            optionKey="name"
            options={teamsList}
            onChange={(e: any, data: Array<{ [Key: string]: any }>) =>
              handleTeams(data)
            }
            customClass={dropdownInputStyle}
            // disabled={selectedBoard?._id}
          />
        </Box>

        {!selectedBoard && (
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
        )}
      </ResponsiveDialog>
    </React.Fragment>
  );
};

export default Update;
