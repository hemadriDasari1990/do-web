import { ALPHA_NUMERIC_WITH_SPACE, allow } from "../../../util/regex";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateNewTeam from "../../../assets/team.svg";
import { NAME_MAX_CHAR_COUNT } from "../../../util/constants";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { updateTeam } from "../../../redux/actions/team";
import { useDispatch } from "react-redux";
import { useTeamLoading } from "../../../redux/state/team";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));
const Loader = React.lazy(() => import("../../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedTeam } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { loading } = useTeamLoading();
  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: selectedTeam?.name,
    teamId: selectedTeam?._id,
  });
  const { name } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedTeam?._id) {
      setFormData({
        ...formData,
        name: selectedTeam.name,
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
    dispatch(updateTeam({ ...formData }));
    setFormData({});
  };

  const disableButton = () => {
    if (!name || !name.trim().length) {
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
        <Loader enable={loading} backdrop={true} />
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
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ALPHA_NUMERIC_WITH_SPACE, NAME_MAX_CHAR_COUNT)
          }
        />
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
};

export default Create;
