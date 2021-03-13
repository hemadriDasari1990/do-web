import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import ScrumBoard from "../../../assets/board.svg";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { updateBoard } from "../../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

const Update = (props: any) => {
  const { openDialog, handleUpdateForm, selectedBoard } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();

  /* Redux hooks */
  const { projectId } = useParams<{ projectId: string }>();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: "",
    description: "",
    noOfSections: 0,
    sprint: 0,
  });
  const { title, description, noOfSections, sprint } = formData;

  /* React Hooks */
  useEffect(() => {
    if (selectedBoard && selectedBoard._id) {
      setFormData({
        ...formData,
        title: selectedBoard.title,
        description: selectedBoard.description,
        boardId: selectedBoard._id,
      });
    }
  }, [selectedBoard]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
    setFormData({
      title,
      description,
      noOfSections: 0,
      sprint: 0,
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateBoard({
        title,
        description,
        noOfSections: noOfSections ? parseInt(noOfSections) : 0,
        sprint: sprint ? parseInt(sprint) : 0,
        projectId,
      })
    );
  };

  const disableButton = () => {
    if (!title.trim().length) {
      return true;
    }
    if (!description.trim().length) {
      return true;
    }

    if (!noOfSections || noOfSections === 0) {
      return true;
    }

    if (!sprint || sprint === 0) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Board"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Hidden only={["xs"]}>
          <Box mt={5} textAlign="center">
            <Zoom in={true} timeout={2000}>
              <img src={ScrumBoard} height="200px" width="fit-content" />
            </Zoom>
          </Box>
        </Hidden>
        <Box>
          <TextField
            name="title"
            id="title"
            label="Title"
            placeholder="Enter title of the board"
            value={title}
            onChange={handleInput}
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="description"
            id="description"
            label="Description"
            placeholder="Enter description of the board"
            value={description}
            onChange={handleInput}
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="noOfSections"
            id="noOfSections"
            label="Number Of Sections"
            placeholder="Enter no of senctions"
            value={noOfSections}
            onChange={handleInput}
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="sprint"
            id="sprint"
            label="Which Sprint"
            placeholder="Enter your sprint number"
            value={sprint}
            onChange={handleInput}
            required
            className={textFieldStyle}
          />
        </Box>
      </ResponsiveDialog>
    </React.Fragment>
  );
};

export default Update;
