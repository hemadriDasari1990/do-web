import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateNewTeam from "../../../assets/team.svg";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { updateTeam } from "../../../redux/actions/team";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedTeam } = props;
  const { textFieldStyle } = useStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: selectedTeam?.name,
    description: selectedTeam?.description,
    teamId: selectedTeam?._id,
  });
  const { name, description } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedTeam?._id) {
      setFormData({
        ...formData,
        name: selectedTeam.name,
        description: selectedTeam.description,
        teamId: selectedTeam._id,
      });
    }
    if (!selectedTeam?._id) {
      setFormData({});
    }
  }, [selectedTeam]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
  };

  const handleSubmit = () => {
    dispatch(updateTeam({ ...formData, userId }));
    setFormData({});
  };

  const disableButton = () => {
    if (!name || !name.trim().length) {
      return true;
    }
    if (!description || !description.trim().length) {
      return true;
    }
    return false;
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Team"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={CreateNewTeam} height="150px" width="fit-content" />
          </Zoom>
        </Box>
        <TextField
          name="name"
          id="name"
          label="Name"
          placeholder="Enter your team name"
          value={name}
          defaultValue={name}
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
          placeholder="Enter description about team"
          value={description}
          onChange={handleInput}
          required
          fullWidth
          className={textFieldStyle}
        />
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
};

export default Create;
