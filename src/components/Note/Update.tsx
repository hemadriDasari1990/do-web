import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../socket";

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #1e1e58",
      paddingTop: "0px !important",
    },
  },
}));

export default function NoteUpdate(props: any) {
  const { sectionId, selectedNote, handleCancel } = props;
  const { textfieldStyle } = useStyles();

  /* Local states */
  const [description, setDescription] = useState(
    selectedNote?.description || ""
  );

  /* Handler functions */
  const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const saveNote = () => {
    if (selectedNote?._id) {
      socket.emit("update-note", {
        description: description,
        sectionId,
        noteId: selectedNote?._id,
      });
      return;
    }

    socket.emit("create-note", {
      description: description,
      sectionId,
    });
  };

  return (
    <React.Fragment>
      <Box mb={1}>
        <TextField
          variant="filled"
          size="medium"
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
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
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
