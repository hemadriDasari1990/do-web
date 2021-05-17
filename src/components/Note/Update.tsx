import {
  ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
  allow,
} from "../../util/regex";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MAX_CHAR_COUNT } from "../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { getRemainingCharLength, parseJwt } from "../../util";
import { makeStyles } from "@material-ui/core/styles";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router-dom";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";
import { useBoard } from "../../redux/state/board";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";

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
  const { sectionId, selectedNote, handleCancel, totalNotes } = props;
  const { textfieldStyle } = useStyles();
  const { memberId } = useLogin();
  const { socket } = useSocket();
  const { boardId, token } = useParams<{ boardId: string; token?: string }>();
  const { board } = useBoard();
  const descodedData: { [Key: string]: any } = token ? parseJwt(token) : null;
  const creatorId = memberId || descodedData?.memberId;

  /* Local states */
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: selectedNote?.description || "",
    isAnnonymous: selectedNote?.isAnnonymous || false,
  });
  const { description, isAnnonymous } = formData;

  /* Handler functions */
  const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const charCount = event.target.value.length;
    const charLeft = getRemainingCharLength(MAX_CHAR_COUNT, charCount);
    setCount(charLeft);
  };

  const saveNote = () => {
    if (selectedNote?._id) {
      socket.emit(`update-note`, {
        memberId: !isAnnonymous ? creatorId : null,
        boardId,
        description: description,
        previousDescription: selectedNote?.description,
        sectionId,
        noteId: selectedNote?._id,
        isAnnonymous: isAnnonymous ? isAnnonymous : selectedNote?.isAnnonymous,
        createdById: selectedNote?.createdById,
        ...(!isAnnonymous ? { updatedById: creatorId } : {}),
      });
      return;
    }

    socket.emit(`create-note`, {
      memberId: !isAnnonymous ? creatorId : null,
      boardId,
      description: description,
      sectionId,
      isAnnonymous: isAnnonymous,
      position: totalNotes ? totalNotes : 0,
      ...(!isAnnonymous
        ? { createdById: creatorId, updatedById: creatorId }
        : { createdById: null, updatedById: null }),
    });
  };

  const handleIsAnnonymous = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isAnnonymous: !isAnnonymous });
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
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(
              event,
              ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
              MAX_CHAR_COUNT
            )
          }
        />
        <Box mt={1} ml={1} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2">{count} chars</Typography>
          </Box>
          <Box display="flex">
            <Box mt={-1}>
              {!board?.isAnnonymous && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAnnonymous}
                      onChange={handleIsAnnonymous}
                      value="false"
                      color="primary"
                      name="isAnnonymous"
                      // disabled={selectedBoard?._id && isDefaultBoard}
                    />
                  }
                  label={
                    <Typography variant="h6">Post as annonymous</Typography>
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
