import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../socket";
import { useLogin } from "../../redux/state/login";
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
  const { sectionId, selectedNote, handleCancel, notes } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();

  /* Local states */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: selectedNote?.description || "",
    isAnnonymous: selectedNote?.isAnnonymous || false,
  });
  const { description, isAnnonymous } = formData;

  /* Handler functions */
  const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const saveNote = () => {
    if (selectedNote?._id) {
      socket.emit("update-note", {
        description: description,
        sectionId,
        noteId: selectedNote?._id,
        isAnnonymous: isAnnonymous ? isAnnonymous : selectedNote?.isAnnonymous,
        createdById: selectedNote?.createdById,
        ...(!isAnnonymous ? { updatedById: userId } : {}),
      });
      return;
    }

    socket.emit("create-note", {
      description: description,
      sectionId,
      isAnnonymous: isAnnonymous,
      position: notes?.length + 1,
      ...(!isAnnonymous
        ? { createdById: userId, updatedById: userId }
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
