import {
  ALPHABET_NUMIREC_AND_SOME_SPECIAL_CHARACTERS,
  allow,
} from "../../util/regex";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MAX_CHAR_COUNT } from "../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { getRemainingCharLength } from "../../util";
import { makeStyles } from "@material-ui/core/styles";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router-dom";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #172b4d",
      paddingTop: "0px !important",
    },
  },
}));

export default function NoteUpdate(props: any) {
  const { sectionId, selectedNote, handleCancel } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();
  const { socket } = useSocket();
  const { boardId } = useParams<{ boardId: string }>();

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
        userId: !isAnnonymous ? userId : null,
        boardId,
        description: description,
        previousDescription: selectedNote?.description,
        sectionId,
        noteId: selectedNote?._id,
        isAnnonymous: isAnnonymous ? isAnnonymous : selectedNote?.isAnnonymous,
        createdById: selectedNote?.createdById,
        ...(!isAnnonymous ? { updatedById: userId } : {}),
      });

      return;
    }

    socket.emit(`create-note`, {
      userId: !isAnnonymous ? userId : null,
      boardId,
      description: description,
      sectionId,
      isAnnonymous: isAnnonymous,
      ...(!isAnnonymous
        ? { createdById: userId, updatedById: userId }
        : { createdById: null, updatedById: null }),
    });
  };

  const handleIsAnnonymous = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isAnnonymous: !isAnnonymous });
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
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
              ALPHABET_NUMIREC_AND_SOME_SPECIAL_CHARACTERS,
              MAX_CHAR_COUNT
            )
          }
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
        <Box mt={1} ml={1} display="flex" justifyContent="flex-end">
          <Typography variant="subtitle2">{count} chars</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box mt={-0.5}>
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
            label={<Typography variant="h6">Post as annonymous</Typography>}
          />
        </Box>
        <Box>
          <Tooltip arrow title="Save Note">
            <Zoom in={true} timeout={1500}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Zoom>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip arrow title="Save Note">
            <Zoom in={true} timeout={1500}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!description.trim()}
                onClick={() => saveNote()}
              >
                Add Note
              </Button>
            </Zoom>
          </Tooltip>
        </Box>
      </Box>
    </React.Fragment>
  );
}
