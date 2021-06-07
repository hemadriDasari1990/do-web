import {
  ALPHA_NUMERIC_WITH_SPACE,
  EMAIL_PATTERN,
  allow,
} from "../../../util/regex";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import DoSnackbar from "../../Snackbar/components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loader from "../../Loader/components";
import { NAME_MAX_CHAR_COUNT } from "../../../util/constants";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useSocket } from "../../../redux/state/socket";

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

  /* Local states */
  const [error, setError] = React.useState<string>("");
  const [showCreateMember, setShowCreateMember] = React.useState<boolean>(
    false
  );

  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [createMember, setCreateMember] = React.useState<boolean>(false);
  const [member, setMember] = React.useState<{ [Key: string]: any }>({
    name: "",
    email: "",
  });
  const { name, email } = member;

  /* Handler functions */
  const handleSendInvite = () => {
    setError("");
    setFetching(true);
    socket.emit("invite-member-to-board", {
      id: selectedBoard?._id,
      member: member,
      createMember,
    });
  };

  useEffect(() => {
    setMember({
      name: "",
      email: "",
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
    setMember({ ...member, email: emailInput });
  };

  const disableButton = () => {
    if (!member) {
      return true;
    }
    if (!member.name?.trim().length || !EMAIL_PATTERN.test(member?.email)) {
      return true;
    }
    if (showSnackbar) {
      return true;
    }
    return false;
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [event.target.name]: event.target.value });
    setShowCreateMember(true);
  };

  const handleCreateMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateMember(!createMember);
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
      {EMAIL_PATTERN.test(email) && !member?._id ? (
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
      {showCreateMember && name?.trim()?.length ? (
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
            label={<Typography variant="h6">Also create as member</Typography>}
          />
        </Box>
      ) : null}
    </ResponsiveDialog>
  );
}
