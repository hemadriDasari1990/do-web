import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import CreateNewProject from "../../../assets/create.svg";

import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { updateProject } from "../../../redux/actions/project";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedProject } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { departmentId } = useParams<{ departmentId: string }>();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: "",
    description: "",
    departmentId,
    projectId: selectedProject._id,
  });
  const { title, description } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedProject?._id) {
      setFormData({
        ...formData,
        title: selectedProject.title,
        description: selectedProject.description,
        projectId: selectedProject._id,
      });
    }
    if (!selectedProject?._id) {
      setFormData({});
    }
  }, [selectedProject]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handlePrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, isPrivate: !isPrivate });
  // };

  const handleClose = () => {
    handleUpdateForm();
  };

  const handleSubmit = () => {
    dispatch(updateProject({ ...formData, departmentId }));
  };

  const disableButton = () => {
    if (!title?.trim()?.length) {
      return true;
    }
    if (!description?.trim()?.length) {
      return true;
    }
    return false;
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Project"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={CreateNewProject} height="130px" width="fit-content" />
          </Zoom>
        </Box>
        <TextField
          name="title"
          id="title"
          label="Project Name"
          placeholder="Enter your project name"
          value={title}
          onChange={handleInput}
          required
          fullWidth
          className={textFieldStyle}
        />
        <TextField
          multiline
          name="description"
          id="description"
          label="Description"
          placeholder="Enter description about project"
          value={description}
          onChange={handleInput}
          fullWidth
          className={textFieldStyle}
        />
        {/* <Box mt={2}>
          <Typography variant="h6">
            Do you like to mark this project as private?
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivate}
                onChange={handlePrivate}
                value="false"
                color="primary"
                name="isPrivate"
              />
            }
            label={<Typography variant="h6">Mark as private</Typography>}
          />
        </Box> */}
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
};

export default Create;
