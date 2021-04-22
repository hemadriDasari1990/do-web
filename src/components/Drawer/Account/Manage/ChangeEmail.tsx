import { EMAIL_PATTERN, allow } from "../../../../util/regex";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useUser, useUserLoading } from "../../../../redux/state/user";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoSnackbar from "../../../Snackbar/components";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { storeAction } from "../../../../redux/actions/common";
import { updateEmail } from "../../../../redux/actions/user";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

const ChangeEmail = () => {
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { userUpdated } = useUser();
  const { loading } = useUserLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    email: "",
    currentEmail: "",
    password: "",
  });
  const { email, password, currentEmail } = formData;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!loading && (userUpdated?.errorId || userUpdated?.code) && apiCalled) {
      setOpenSnackbar(true);
      setApiCalled(false);
    }
    if (!loading && userUpdated?.updated && apiCalled) {
      setOpenSnackbar(true);
      setApiCalled(false);
      setTimeout(() => {
        dispatch(storeAction(""));
      }, 2000);
    }
  }, [loading, userUpdated]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setApiCalled(false);
    dispatch(
      updateEmail({
        ...formData,
      })
    );
    setApiCalled(true);
  };

  const disableButton = () => {
    if (!email || !email?.trim()?.length || !EMAIL_PATTERN.test(email)) {
      return true;
    }
    if (
      !currentEmail ||
      !currentEmail?.trim()?.length ||
      !EMAIL_PATTERN.test(currentEmail)
    ) {
      return true;
    }
    if (!password || !password?.trim()?.length) {
      return true;
    }
    return false;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status={userUpdated?.errorId || userUpdated?.code ? "error" : "success"}
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {userUpdated?.errorMessage ||
            userUpdated?.message ||
            userUpdated?.codeName}
        </Typography>
      </DoSnackbar>
    );
  };

  return (
    <React.Fragment>
      {renderSnackbar()}
      <Box>
        <Box>
          <TextField
            name="currentEmail"
            id="currentEmail"
            label="Current Email Address"
            placeholder="Enter your current Email Address"
            value={currentEmail}
            onChange={handleInput}
            autoComplete="off"
            required
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, EMAIL_PATTERN)
            }
          />
        </Box>
        <Box>
          <TextField
            name="password"
            label="Current Password"
            type="password"
            autoComplete="off"
            placeholder="Enter your current password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event)
            }
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="email"
            id="email"
            label="New Email Address"
            placeholder="Enter your new Email Address"
            value={email}
            onChange={handleInput}
            autoComplete="off"
            required
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, EMAIL_PATTERN)
            }
          />
        </Box>

        <Box mt={5} display="flex" justifyContent="flex-end">
          <Button
            variant={disableButton() ? "outlined" : "contained"}
            color={"primary"}
            onClick={() => handleSave()}
            disabled={disableButton()}
          >
            <Typography
              variant="h6"
              color={disableButton() ? "primary" : "secondary"}
            >
              Update
            </Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ChangeEmail;
