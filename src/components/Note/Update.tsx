import {
  ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
  allow,
} from "../../util/regex";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MAX_NOTE_CHAR_COUNT } from "../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { getMemberId } from "../../util";
import { makeStyles } from "@material-ui/core/styles";
// import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useParams } from "react-router-dom";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      paddingTop: "0px !important",
    },
  },
}));

export default function NoteUpdate(props: any) {
  const {
    sectionId,
    selectedNote,
    handleCancel,
    totalNotes,
    setShowNote,
  } = props;
  const { textfieldStyle } = useStyles();
  const { socket } = useSocket();
  const { boardId } = useParams<{ boardId: string; token?: string }>();
  const { board } = useBoard();
  const joinedMemberId = getMemberId(boardId);
  // const authenticated = useAuthenticated();

  /* Local states */
  const [count, setCount] = useState(selectedNote?.description?.length || 0);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: selectedNote?.description || "",
    isAnonymous: selectedNote?.isAnonymous || false,
  });
  const { description, isAnonymous } = formData;

  /* Handler functions */
  const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const charCount = event.target.value.length;
    setCount(charCount);
  };

  const saveNote = () => {
    if (selectedNote?._id) {
      socket.emit(`update-note`, {
        boardId,
        description: description,
        previousDescription: selectedNote?.description,
        sectionId,
        noteId: selectedNote?._id,
        isAnonymous: isAnonymous,
        createdById: selectedNote?.createdById,
        ...(!isAnonymous
          ? { updatedById: joinedMemberId }
          : { updatedById: null }),
      });
      setShowNote(false);
      return;
    }
    socket.emit(`create-note`, {
      boardId,
      description: description,
      sectionId,
      isAnonymous: isAnonymous,
      position: totalNotes ? totalNotes : 0,
      ...(!isAnonymous
        ? {
            createdById: joinedMemberId,
            updatedById: joinedMemberId,
          }
        : { createdById: null, updatedById: null }),
    });
    setShowNote(false);
  };

  const handleIsAnonymous = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isAnonymous: !isAnonymous });
  };

  const handleAlt = () => {
    const newDescription = description + "\r\n";
    setFormData({ ...formData, description: newDescription });
  };

  return (
    <React.Fragment>
      <Box mb={1}>
        <TextField
          variant="filled"
          size="medium"
          name="description"
          fullWidth
          multiline
          onChange={handleNote}
          className={textfieldStyle}
          placeholder="Your comments"
          value={description}
          InputProps={{
            disableUnderline: true,
            style: {
              minHeight: 90,
              paddingTop: 40,
            },
          }}
          onKeyPress={(event: React.KeyboardEvent<any>) => {
            allow(
              event,
              ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
              MAX_NOTE_CHAR_COUNT
            );
            if (
              (event.key === "Enter" || event.keyCode == 13) &&
              (event.altKey || event.shiftKey)
            ) {
              handleAlt();
            }
            if (
              (event.key === "Enter" || event.keyCode == 13) &&
              !event.altKey &&
              !event.shiftKey
            ) {
              saveNote();
            }
          }}
        />
        <Box mt={1} ml={1} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2">
              {count}/{MAX_NOTE_CHAR_COUNT} chars
            </Typography>
          </Box>
          <Box display="flex">
            <Box mt={-1}>
              {!board?.isAnonymous &&
                (selectedNote?.createdById === joinedMemberId ||
                  !selectedNote) && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAnonymous}
                        onChange={handleIsAnonymous}
                        value="false"
                        color="primary"
                        name="isAnonymous"
                        // disabled={selectedBoard?._id && isDefaultBoard}
                      />
                    }
                    label={
                      <Typography variant="h6">Post as anonymous</Typography>
                    }
                  />
                )}
            </Box>
            <Box display="flex">
              <Box mr={1}>
                <Tooltip arrow title="Save Note">
                  <Zoom in={true} timeout={1500}>
                    <Fab
                      color="secondary"
                      disabled={!description.trim()}
                      onClick={() => saveNote()}
                    >
                      <DoneIcon color="primary" fontSize="small" />
                    </Fab>
                  </Zoom>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip arrow title="Cancel Note">
                  <Zoom in={true} timeout={1500}>
                    <Fab color="secondary" onClick={() => handleCancel()}>
                      <ClearIcon color="primary" fontSize="small" />
                    </Fab>
                  </Zoom>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
