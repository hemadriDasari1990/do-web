import { ALPHA_NUMERIC_WITH_SPACE, allow } from "../../util/regex";
import { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import DoImage from "../common/Image";
import Hidden from "@material-ui/core/Hidden";
import { MAX_CHAR_COUNT } from "../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { getMemberId } from "../../util";
import { makeStyles } from "@material-ui/core/styles";
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

export default function SectionUpdate(props: any) {
  const { openDialog, selectedSection, handleClose } = props;
  const { textfieldStyle } = useStyles();
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();
  const joinedMemberId = getMemberId(boardId);

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
      joinedMemberId,
    });
    handleClose();
  };

  const handleCreate = () => {
    socket.emit("create-section", {
      name: name,
      boardId: boardId,
      joinedMemberId,
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
            <DoImage
              src="section.svg"
              height="200px"
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
          placeholder="Enter new section name"
          multiline
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          className={textfieldStyle}
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
          }
        />
      </Box>
    </ResponsiveDialog>
  );
}
