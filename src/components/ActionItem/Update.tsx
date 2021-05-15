import { ALPHA_NUMERIC_WITH_SPACE, allow } from "../../util/regex";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { MAX_CHAR_COUNT } from "../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useLogin } from "../../redux/state/login";
import { useSocket } from "../../redux/state/socket";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #172B4D",
      paddingTop: "0px !important",
    },
  },
}));

export default function ActionItemUpdate(props: any) {
  const { actionId, selectedActionItem, handleCancel } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();
  const { socket } = useSocket();

  /* Local states */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    description: selectedActionItem?.description || "",
  });
  const { description } = formData;

  /* Handler functions */
  const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const saveActionItem = () => {
    if (selectedActionItem?._id) {
      socket.emit(`update-action-item`, {
        description: description,
        actionId,
        noteId: selectedActionItem?._id,
        createdById: selectedActionItem?.createdById,
        updatedById: userId,
      });
      return;
    }

    socket.emit(`create-action-item`, {
      description: description,
      actionId,
      assignedById: userId,
      assignedToId: userId,
    });
  };

  return (
    <React.Fragment>
      <Box mb={1}>
        <TextField
          variant="filled"
          size="medium"
          name="description"
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
          }
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
        <Box></Box>
        <Box>
          <Tooltip arrow title="Cancel Action item">
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
          <Tooltip arrow title="Save Action item">
            <Zoom in={true} timeout={1500}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!description.trim()}
                onClick={() => saveActionItem()}
              >
                Add Action item
              </Button>
            </Zoom>
          </Tooltip>
        </Box>
      </Box>
    </React.Fragment>
  );
}
