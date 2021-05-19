import {
  ALPHA_NUMERIC_WITH_SPACE,
  ONLY_NUMBERS,
  allow,
} from "../../util/regex";
import React, { useState, useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import BoardIcon from "../../assets/board";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Hidden from "@material-ui/core/Hidden";
import Loader from "../Loader/components";
import { MAX_CHAR_COUNT } from "../../util/constants";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { getRemainingCharLength } from "../../util";
import { createInstantBoard } from "../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useBoard, useBoardUpdateLoading } from "../../redux/state/board";
import { useHistory } from "react-router-dom";
import { replaceStr } from "../../util";
import { BOARD_DASHBOARD } from "../../routes/config";
import DoSnackbar from "../Snackbar/components";

const HintMessage = React.lazy(() => import("../HintMessage"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));

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

const InstantRetro = (props: any) => {
  const { openDialog, handleCloseDialog } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();

  /* Redux hooks */
  const { board } = useBoard();
  const { loading } = useBoardUpdateLoading();
  const history = useHistory();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: "",
    noOfSections: 0,
    isDefaultBoard: false,
    name: "",
  });
  const [count, setCount] = useState(0);
  const [apiCalled, setApiCalled] = useState(false);
  const [showError, setShowError] = useState(false);

  const { description, noOfSections, isDefaultBoard, name } = formData;

  useEffect(() => {
    if (!loading && board && board._id) {
      history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
      setFormData({});
      setApiCalled(false);
      setShowError(false);
    }
    if (!loading && board && board.errorId && apiCalled) {
      setShowError(true);
    }
  }, [loading, board, apiCalled]);

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
    handleCloseDialog();
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      description: "",
      noOfSections: 0,
      isDefaultBoard: false,
    });
  };

  const handleSubmit = () => {
    dispatch(
      createInstantBoard({
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        isDefaultBoard,
        name,
        isInstant: true,
      })
    );
  };

  const disableButton = () => {
    if (!isDefaultBoard && (!noOfSections || noOfSections === 0)) {
      return true;
    }

    if (!name || !name?.trim()) {
      return true;
    }
    return false;
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
      {renderSnackbar()}
      <ResponsiveDialog
        open={openDialog}
        title={"Create Instant Board"}
        pcta="Create"
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
          <TextField
            name="name"
            id="name"
            label="Name"
            placeholder="Enter name of the board"
            value={name}
            onChange={handleInput}
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
            }
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
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
            <HintMessage message="Please note System will generate default sections with name 'Section Title' based on number of sections you specify and you need to update them manually once board is created and before starting the session." />
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
              />
            }
            label={<Typography variant="h6">Create default Board</Typography>}
          />
        </Box>
        {isDefaultBoard && (
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
      </ResponsiveDialog>
    </React.Fragment>
  );
};

export default InstantRetro;
