import {
  ALPHA_NUMERIC_WITH_SPACE,
  EMAIL_PATTERN,
  allow,
} from "../../../util/regex";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import DoAutoComplete from "../../common/DoAutoComplete";
import DoImage from "../../common/Image";
import JoinTeam from "../../../assets/join-team.svg";
import Loader from "../../Loader/components";
import { NAME_MAX_CHAR_COUNT } from "../../../util/constants";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { getTeams } from "../../../redux/actions/team";
import { updateMember } from "../../../redux/actions/member";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";
import { useMemberLoading } from "../../../redux/state/member";
import { useTeam } from "../../../redux/state/team";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
  dropdownInputStyle: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "53%",
    },
  },
}));

const Create = React.memo((props: any) => {
  const { openDialog, handleUpdateForm, selectedMember } = props;
  const { textFieldStyle, dropdownInputStyle } = useStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();
  const { loading } = useMemberLoading();
  const { teams: teamsList } = useTeam();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: selectedMember?.name,
    email: selectedMember?.email,
    userId: selectedMember?.userId,
    teams: [],
  });
  const { name, email, teams } = formData;

  useEffect(() => {
    dispatch(getTeams(userId, "", 0, 100));
  }, []);

  useEffect(() => {
    if (selectedMember?._id) {
      setFormData({
        ...formData,
        name: selectedMember?.name,
        email: selectedMember?.email,
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
    setFormData({});
  };

  const disableButton = () => {
    if (!name || !name?.trim().length) {
      return true;
    }
    if (!email?.trim().length || !EMAIL_PATTERN.test(email)) {
      return true;
    }
    return false;
  };

  const handleTeams = (data: Array<{ [Key: string]: any }>) => {
    setFormData({ ...formData, teams: data });
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
        <Loader enable={loading} backdrop={true} />
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <DoImage
              src={JoinTeam}
              height="150px"
              width="fit-content"
              placeholderImg={JoinTeam}
              errorImg={JoinTeam}
            />
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
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ALPHA_NUMERIC_WITH_SPACE, NAME_MAX_CHAR_COUNT)
          }
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
        <DoAutoComplete
          disabled={selectedMember?._id}
          multiple={true}
          defaultValue={teams}
          textInputLabel="Add member to teams"
          textInputPlaceholder="Select teams"
          optionKey="name"
          options={teamsList}
          onChange={(e: any, data: Array<{ [Key: string]: any }>) =>
            handleTeams(data)
          }
          customClass={dropdownInputStyle}
        />
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
});

export default Create;
