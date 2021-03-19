import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import JoinTeam from "../../../assets/join-team.svg";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { emailRegex } from "../../../util/regex";
import { updateMember } from "../../../redux/actions/member";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedMember } = props;
  const { textFieldStyle } = useStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: selectedMember?.name,
    email: selectedMember?.email,
    userId: selectedMember?.userId,
  });
  const { name, email } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedMember?._id) {
      setFormData({
        ...formData,
        name: selectedMember.name,
        email: selectedMember.email,
        userId: selectedMember.userId,
        memberId: selectedMember._id,
      });
    }
    if (!selectedMember?._id) {
      setFormData({});
    }
  }, [selectedMember]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    handleUpdateForm();
  };

  const handleSubmit = () => {
    dispatch(updateMember({ ...formData, userId }));
  };

  const disableButton = () => {
    if (!name || !name?.trim().length) {
      return true;
    }
    if (!email?.trim().length || !emailRegex.test(email)) {
      return true;
    }
    return false;
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Member"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={JoinTeam} height="150px" width="fit-content" />
          </Zoom>
        </Box>
        <TextField
          name="name"
          id="name"
          label="Name"
          placeholder="Enter member full name"
          value={name}
          defaultValue={name}
          onChange={handleInput}
          required
          fullWidth
          className={textFieldStyle}
        />
        <TextField
          name="email"
          id="email"
          label="Email Address"
          placeholder="Enter member email address"
          value={email}
          onChange={handleInput}
          autoComplete="off"
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
