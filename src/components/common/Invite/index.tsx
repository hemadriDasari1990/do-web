import {
  ALPHA_NUMERIC_WITH_SPACE,
  EMAIL_PATTERN,
  allow,
} from "../../../util/regex";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import DoAutoComplete from "../DoAutoComplete";
import DoSnackbar from "../../Snackbar/components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loader from "../../Loader/components";
import { NAME_MAX_CHAR_COUNT } from "../../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useSocket } from "../../../redux/state/socket";
import { useTeam } from "../../../redux/state/team";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  primaryButtonStyle: {
    minWidth: "93%",
    margin: "0px 15px",
    "& .MuiButton-label": {
      justifyContent: "center",
    },
  },
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

export default function Invite(props: any) {
  const { openDialog, selectedBoard, handleClose } = props;
  const { primaryButtonStyle, textFieldStyle } = useStyles();
  const { socket } = useSocket();
  const { teams: teamsList } = useTeam();

  /* Local states */
  const [error, setError] = React.useState<string>("");

  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<{ [Key: string]: any }>({
    name: "",
    email: "",
    teams: [],
    createMember: false,
  });
  const { name, email, teams, createMember } = formData;

  /* Handler functions */
  const handleSendInvite = () => {
    setError("");
    setFetching(true);
    socket.emit("invite-member-to-board", {
      id: selectedBoard?._id,
      name,
      email,
      createMember,
      teams,
    });
  };

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      teams: [],
      createMember: false,
    });
  }, [openDialog]);

  useEffect(() => {
    socket.on(
      "invite-member-to-board-response",
      (response: { [Key: string]: any }) => {
        if (!response?.error) {
          setError("");
          setFetching(false);
          setShowSnackbar(true);
          setTimeout(() => {
            handleClose();
            setShowSnackbar(false);
          }, 2000);
        } else {
          setFetching(false);
          setError(response?.message?.toString());
          setShowSnackbar(true);
        }
      }
    );
    return () => {
      socket.off("invite-member-to-board-response");
    };
  }, [fetching]);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value;
    setFormData({ name: "", createMember: false, email: emailInput });
  };

  const disableButton = () => {
    if (!formData) {
      return true;
    }
    if (
      !teams?.length &&
      (!name?.trim().length || !EMAIL_PATTERN.test(email))
    ) {
      return true;
    }
    if (teams?.length && email?.length) {
      return true;
    }
    if (showSnackbar) {
      return true;
    }
    return false;
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreateMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, createMember: !createMember });
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const renderSnackbar = () => {
    const isError = Boolean(error);
    return (
      <DoSnackbar
        open={showSnackbar}
        status={isError ? "error" : "success"}
        handleClose={handleSnackbarClose}
      >
        {isError ? (
          <Typography variant="h6" color="secondary">
            {error}
          </Typography>
        ) : (
          <Typography variant="h6" color="secondary">
            Invite Sent Successfully
          </Typography>
        )}
      </DoSnackbar>
    );
  };

  const handleTeam = (data: { [Key: string]: any }) => {
    setFormData({ teams: data ? [data] : [] });
  };

  return (
    <ResponsiveDialog
      disablePrimaryCTA={disableButton()}
      open={openDialog}
      title="Invite to board"
      pcta="Send invitation"
      disable
      handleSave={handleSendInvite}
      handleClose={handleClose}
      maxWidth={440}
      primaryButtonStyle={primaryButtonStyle}
    >
      <Loader enable={fetching} backdrop={true} />
      {renderSnackbar()}
      {!email && (
        <Box>
          <DoAutoComplete
            textInputLabel="Invite Team"
            textInputPlaceholder="Select team"
            optionKey="name"
            options={teamsList}
            onChange={(e: any, data: { [Key: string]: any }) =>
              handleTeam(data)
            }
            // customClass={dropdownInputStyle}
          />
        </Box>
      )}
      {!teams?.length ? (
        <>
          <Box>
            <TextField
              name="email"
              id="email"
              label="Email Address"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmail}
              className={textFieldStyle}
              // error={Boolean(error)}
              // helperText={error}
            />
          </Box>
          {EMAIL_PATTERN.test(email) && !formData?._id ? (
            <Box>
              <TextField
                name="name"
                id="name"
                label="Name"
                placeholder="Enter Fullname"
                value={name}
                onChange={handleName}
                className={textFieldStyle}
                onKeyPress={(event: React.KeyboardEvent<any>) =>
                  allow(event, ALPHA_NUMERIC_WITH_SPACE, NAME_MAX_CHAR_COUNT)
                }
              />
            </Box>
          ) : null}
          {name?.trim()?.length ? (
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={createMember}
                    onChange={handleCreateMember}
                    value="false"
                    color="primary"
                    name="createMember"
                  />
                }
                label={
                  <Typography variant="h6">Also create as member</Typography>
                }
              />
            </Box>
          ) : null}
        </>
      ) : null}
    </ResponsiveDialog>
  );
}
