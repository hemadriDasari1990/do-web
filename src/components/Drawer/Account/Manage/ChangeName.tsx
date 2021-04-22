import { ALPHA_NUMERIC_WITH_SPACE, allow } from "../../../../util/regex";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useUser, useUserLoading } from "../../../../redux/state/user";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoSnackbar from "../../../Snackbar/components";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { storeAction } from "../../../../redux/actions/common";
import { updateName } from "../../../../redux/actions/user";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

const ChangeName = () => {
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { userUpdated, name: userName } = useUser();
  const { loading } = useUserLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: userName,
  });
  const { name } = formData;
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
      updateName({
        ...formData,
      })
    );
    setApiCalled(true);
  };

  const disableButton = () => {
    if (!name || !name?.trim()?.length) {
      return true;
    }

    if (name?.trim() === userName.trim()) {
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
            name="name"
            id="name"
            label="Full name"
            placeholder="Enter your full name"
            value={name}
            onChange={handleInput}
            autoComplete="off"
            required
            className={textFieldStyle}
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(event, ALPHA_NUMERIC_WITH_SPACE)
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

export default ChangeName;
