import { Theme, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import DoAutoComplete from "../DoAutoComplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { emailRegex } from "../../../util/regex";
import useDebounce from "../useDebounce";
import { useSocket } from "../../../redux/state/socket";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  dropdownInputStyle: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "53%",
    },
  },
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
  //   const { userId } = useLogin();
  const {
    dropdownInputStyle,
    primaryButtonStyle,
    textFieldStyle,
  } = useStyles();
  const { socket } = useSocket();

  /* Local states */
  const [queryString, setQueryString] = useState("");
  const [members, setMembers] = useState<Array<{ [Key: string]: any }>>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [showCreateMember, setShowCreateMember] = React.useState<boolean>(
    false
  );
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [createMember, setCreateMember] = React.useState<boolean>(false);
  const [member, setMember] = React.useState<{ [Key: string]: any }>({
    name: "",
    email: "",
  });
  const { name, email } = member;
  const membersLoading = open && fetching;
  const debouncedValue = useDebounce(queryString, 500);

  /* Handler functions */
  const handleSendInvite = () => {
    setFetching(true);
    socket.emit("invite-member-to-board", {
      id: selectedBoard?._id,
      member: member,
    });
  };

  useEffect(() => {
    socket.on(
      "invite-member-to-board-response",
      (response: { [Key: string]: any }) => {
        setFetching(false);
        handleClose();
      }
    );
    return () => {
      socket.off("invite-member-to-board-response");
    };
  }, [fetching]);

  useEffect(() => {
    socket.emit("search-members", debouncedValue);
    setFetching(true);
  }, [debouncedValue]);

  useEffect(() => {
    socket.on(
      "search-members-response",
      (members: Array<{ [Key: string]: any }>) => {
        setMembers(members);
        setFetching(false);
      }
    );
    return () => {
      socket.off("search-members-response");
    };
  }, [members]);

  const handleMember = (newMember: { [Key: string]: any } | string) => {
    if (typeof newMember === "string") {
      if (!newMember.trim().length || !emailRegex.test(newMember)) {
        setError(true);
      } else {
        setError(false);
        setMember({ ...member, email: newMember });
        setShowCreateMember(true);
      }
    }
    if (typeof newMember === "object") {
      setShowCreateMember(false);
      setMember({ ...member, ...newMember });
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(event.target.value);
  };

  const disableButton = () => {
    if (!member) {
      return true;
    }
    if (!member.name?.trim().length || !emailRegex.test(member?.email)) {
      return true;
    }
    return false;
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [event.target.name]: event.target.value });
  };

  const handleCreateMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateMember(!createMember);
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
      <DoAutoComplete
        defaultValue={members}
        textInputLabel="Select/Add member"
        textInputPlaceholder="Search by Email address or name"
        optionKey="name"
        options={members}
        isFreeSolo={true}
        autoHighlight
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(e)
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>, input: any) =>
          handleMember(input)
        }
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        error={error}
        helperText="Invalid email address"
        loading={membersLoading}
        customClass={dropdownInputStyle}
      />
      {email && !member._id ? (
        <Box>
          <TextField
            name="name"
            id="name"
            label="Name"
            placeholder="Enter Fullname"
            value={name}
            onChange={handleName}
            className={textFieldStyle}
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
