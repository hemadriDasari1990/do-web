import {
  ALPHA_NUMERIC_WITH_SPACE,
  ONLY_NUMBERS,
  allow,
} from "../../util/regex";
import React, { useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useBoard, useBoardUpdateLoading } from "../../redux/state/board";

import { BOARD_DASHBOARD } from "../../routes/config";
import BoardIcon from "../../assets/board";
import Box from "@material-ui/core/Box";
import DoAutoComplete from "../common/DoAutoComplete";
import DoSnackbar from "../Snackbar/components";
import Hidden from "@material-ui/core/Hidden";
import Loader from "../Loader/components";
import { MAX_CHAR_COUNT } from "../../util/constants";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { createInstantBoard } from "../../redux/actions/board";
import { replaceStr } from "../../util";
import { useDefaultSections } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const HintMessage = React.lazy(() => import("../HintMessage"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(2),
  },
  dropdownInputStyle: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "53%",
    },
  },
}));

const InstantRetro = React.memo((props: any) => {
  const { openDialog, handleCloseDialog } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { board } = useBoard();
  const { loading } = useBoardUpdateLoading();
  const { defaultSections } = useDefaultSections();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: "",
    noOfSections: null,
    name: "",
    defaultSection: "",
  });
  const [count, setCount] = useState(0);
  const [apiCalled, setApiCalled] = useState(false);
  const [showError, setShowError] = useState(false);

  const { description, noOfSections, defaultSection, name } = formData;

  useEffect(() => {
    if (!loading && board && board._id && apiCalled) {
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
      setCount(charCount);
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
      defaultSection: "",
    });
  };

  const handleSubmit = () => {
    setApiCalled(false);
    dispatch(
      createInstantBoard({
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        defaultSection,
        name,
        isInstant: true,
      })
    );
    setApiCalled(true);
  };

  const disableButton = () => {
    if (!defaultSection && (!noOfSections || noOfSections === 0)) {
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

  const handleDefaultSection = (data: { [Key: string]: any }) => {
    setFormData({ ...formData, defaultSection: data?.name });
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderNoOfSections = useCallback(
    () => (
      <>
        {!defaultSection ? (
          <TextField
            name="noOfSections"
            id="noOfSections"
            label="Number Of Sections"
            placeholder="Enter no of senctions"
            value={noOfSections}
            onChange={handleInput}
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, ONLY_NUMBERS, 2)
            }
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
          />
        ) : null}
      </>
    ),
    [defaultSection, noOfSections]
  );

  const renderDefaultTemplate = useCallback(
    () => (
      <>
        {!noOfSections ? (
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
        ) : null}
        {noOfSections ? (
          <Box mt={3}>
            <HintMessage message="Please note System will generate default title as 'Section Title' based on number of sections you specify and you need to update them manually once board is created and before starting the session." />
          </Box>
        ) : null}
      </>
    ),
    [name, noOfSections, defaultSections]
  );

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
            required
          />
        </Box>
        {renderDefaultTemplate()}
        {renderNoOfSections()}
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
            {count}/{MAX_CHAR_COUNT} chars
          </Typography>
        </Box>
      </ResponsiveDialog>
    </React.Fragment>
  );
});

export default InstantRetro;
