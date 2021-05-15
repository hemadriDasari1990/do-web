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
import { useBoard } from "../../redux/state/board";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));

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

export default function SectionUpdate(props: any) {
  const { openDialog, selectedSection, handleClose } = props;
  const { textfieldStyle } = useStyles();
  const { userId } = useLogin();
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();
  const { totalSections } = useBoard();

  /* Local states */
  const [name, setName] = useState("");

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setName(selectedSection?.name);
  }, [selectedSection]);

  const handleUpdate = () => {
    socket.emit("update-section", {
      name: name,
      previousTitle: selectedSection?.name,
      sectionId: selectedSection?._id,
      boardId: selectedSection?.boardId,
      userId,
    });
    handleClose();
  };

  const handleCreate = () => {
    socket.emit("create-section", {
      name: name,
      boardId: boardId,
      userId,
      position: totalSections + 1,
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
          label="Name"
          placeholder="Enter new section name"
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
