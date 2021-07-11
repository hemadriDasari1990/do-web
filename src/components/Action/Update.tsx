import { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import DoImage from "../common/Image";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
      border: "2px solid #113561",
      paddingTop: "0px !important",
    },
  },
}));

export default function ActionUpdate(props: any) {
  const { openDialog, selectedAction, handleClose } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();

  /* Local states */
  const [name, setName] = useState("");

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setName(selectedAction?.name);
  }, [selectedAction]);

  const handleUpdate = () => {
    socket.emit("update-action", {
      name: name,
      actionId: selectedAction?._id,
      boardId: selectedAction?.boardId,
      userId,
    });
    handleClose();
  };

  const handleCreate = () => {
    socket.emit("create-action", {
      name: name,
      boardId: boardId,
      userId,
    });
    handleClose();
  };

  return (
    <ResponsiveDialog
      open={openDialog}
      title={selectedAction?._id ? "Update action" : "Create action"}
      pcta={selectedAction?._id ? "Update" : "Create"}
      handleSave={selectedAction?._id ? handleUpdate : handleCreate}
      handleClose={handleClose}
      maxWidth={440}
    >
      <Hidden only={["xs"]}>
        <Box my={1} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <DoImage
              src="section.svg"
              height={200}
              width="fit-content"
              placeholderImg="section.svg"
              errorImg="section.svg"
            />
          </Zoom>
        </Box>
      </Hidden>
      <Box mb={1}>
        <TextField
          fullWidth
          label="Name"
          placeholder="Enter new action name"
          multiline
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          className={textfieldStyle}
        />
      </Box>
    </ResponsiveDialog>
  );
}
