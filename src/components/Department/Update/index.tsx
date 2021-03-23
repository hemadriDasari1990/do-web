import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateNewDepartment from "../../../assets/department.svg";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { updateDepartment } from "../../../redux/actions/department";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedDepartment } = props;
  const { textFieldStyle } = useStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    title: selectedDepartment.title,
    description: selectedDepartment.description,
    departmentId: selectedDepartment._id,
  });
  const { title, description } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedDepartment?._id) {
      setFormData({
        ...formData,
        title: selectedDepartment.title,
        description: selectedDepartment.description,
        departmentId: selectedDepartment._id,
      });
    }
    if (!selectedDepartment?._id) {
      setFormData({});
    }
  }, [selectedDepartment]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
  };

  const handleSubmit = () => {
    dispatch(updateDepartment({ ...formData, userId }));
  };

  const disableButton = () => {
    if (!title || !title.trim().length) {
      return true;
    }
    // if (!description || !description.trim().length) {
    //   return true;
    // }
    return false;
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Department"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={CreateNewDepartment} height="150px" width="fit-content" />
          </Zoom>
        </Box>
        <TextField
          name="title"
          id="title"
          label="Department Name"
          placeholder="Enter your department name"
          value={title}
          defaultValue={title}
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
          defaultValue={description}
          placeholder="Enter description about department"
          value={description}
          onChange={handleInput}
          fullWidth
          className={textFieldStyle}
        />
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
};

export default Create;
