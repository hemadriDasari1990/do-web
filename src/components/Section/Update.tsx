import { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import updateSection from "../../assets/section.svg";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));

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

export default function SectionUpdate(props: any) {
  const { openDialog, selectedSection, handleClose } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();

  /* Local states */
  const [title, setTitle] = useState("");

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    setTitle(selectedSection?.title);
  }, [selectedSection]);

  const handleUpdate = () => {
    socket.emit("update-section", {
      title: title,
      sectionId: selectedSection?._id,
      boardId: selectedSection?.boardId,
      userId,
    });
    handleClose();
  };

  const handleCreate = () => {
    socket.emit("create-section", {
      title: title,
      boardId: boardId,
      userId,
    });
    handleClose();
  };

  return (
    <ResponsiveDialog
      open={openDialog}
      title={selectedSection?._id ? "Update Section" : "Create section"}
      pcta={selectedSection?._id ? "Update" : "Create"}
      handleSave={selectedSection?._id ? handleUpdate : handleCreate}
      handleClose={handleClose}
      maxWidth={440}
    >
      <Hidden only={["xs"]}>
        <Box my={1} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={updateSection} height="200px" width="fit-content" />
          </Zoom>
        </Box>
      </Hidden>
      <Box mb={1}>
        <TextField
          fullWidth
          label="Title"
          placeholder="Enter new section title"
          multiline
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          className={textfieldStyle}
        />
      </Box>
    </ResponsiveDialog>
  );
}
