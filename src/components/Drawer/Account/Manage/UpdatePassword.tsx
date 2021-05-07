import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { clearUserState, updatePassword } from "../../../../redux/actions/user";
import { useUser, useUserLoading } from "../../../../redux/state/user";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoSnackbar from "../../../Snackbar/components";
import { LOGIN } from "../../../../routes/config";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { logout } from "../../../../redux/actions/login";
import { storeAction } from "../../../../redux/actions/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

const UpdatePassword = () => {
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { userUpdated } = useUser();
  const { loading } = useUserLoading();
  const history = useHistory();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    newPassword: "",
    currentPassword: "",
    newConfirmPassword: "",
  });
  const { newPassword, currentPassword, newConfirmPassword } = formData;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!loading && (userUpdated?.errorId || userUpdated?.code)) {
      setOpenSnackbar(true);
    }
    if (!loading && userUpdated?.updated) {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(logout());
        dispatch(clearUserState());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        dispatch(storeAction(""));
        history.push(LOGIN);
      }, 4000);
    }
  }, [loading, userUpdated]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    dispatch(
      updatePassword({
        ...formData,
      })
    );
  };

  const disableButton = () => {
    if (!currentPassword || !currentPassword?.trim()?.length) {
      return true;
    }
    if (!newPassword || !newPassword?.trim()?.length) {
      return true;
    }
    if (!newConfirmPassword || !newConfirmPassword?.trim()?.length) {
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
            name="currentPassword"
            label="Current Password"
            type="password"
            autoComplete="off"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event)
            }
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="off"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event)
            }
            required
            className={textFieldStyle}
          />
        </Box>
        <Box>
          <TextField
            name="newConfirmPassword"
            label="Re enter new password"
            type="password"
            autoComplete="off"
            placeholder="Re enter your new password"
            value={newConfirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event)
            }
            required
            className={textFieldStyle}
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
              Update Password
            </Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UpdatePassword;
