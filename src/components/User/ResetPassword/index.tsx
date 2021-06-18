import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  resetPassword,
  validateForgotPassword,
} from "../../../redux/actions/login";
import { useForgotPassword, useLoading } from "../../../redux/state/login";
import { useHistory, useParams } from "react-router";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import { LOGIN } from "../../../routes/config";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { useDispatch } from "react-redux";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));
const Loader = React.lazy(() => import("../../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(2),
  },
}));

const ForgotPassword = () => {
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();

  /* Redux hooks */
  const { response, errorId } = useForgotPassword();
  const { loading } = useLoading();

  /* Local state */
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;

  /* React Hooks */
  useEffect(() => {
    if (!loading && response?.code && !errorId) {
      setTimeout(() => {
        history.push(LOGIN);
      }, 2000);
    }
    if (!loading && response && !errorId) {
      setShowSnackbar(true);
    }

    if (!loading && errorId) {
      setShowSnackbar(true);
      if (errorId === "TOKEN_EXPIRED") {
        setTimeout(() => {
          history.push(LOGIN);
        }, 2000);
      }
    }
    // if (!loading && response?.errorId === ALREADY_VERIFIED) {
    //   setShowSnackbar(true);
    //   //   history.push(LOGIN);
    // }
  }, [loading, response]);

  useEffect(() => {
    dispatch(
      validateForgotPassword({
        token: token,
      })
    );
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(resetPassword({ ...formData, token: token }));
  };

  const handleClose = () => {
    setShowSnackbar(false);
    // history.push(LOGIN);
  };

  const disableButton = () => {
    if (password.trim().length < 6) {
      return true;
    }
    if (confirmPassword.trim().length < 6) {
      return true;
    }
    if (password.trim() !== confirmPassword.trim()) {
      return true;
    }
    return false;
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Container>
        <Loader enable={loading} backdrop={true} />
        <DoSnackbar
          open={showSnackbar}
          handleClose={handleClose}
          status={errorId ? "error" : "success"}
        >
          <Typography variant="h6" color="secondary">
            {response?.message}
          </Typography>
        </DoSnackbar>
        <Box textAlign="center" pb={5}>
          <Box mt={8}>
            <Zoom in={true} timeout={2000}>
              <DoImage
                src="reset-password.svg"
                height="200px"
                width="fit-content"
                placeholderImg="reset-password.svg"
                errorImg="reset-password.svg"
              />
            </Zoom>
          </Box>
          <Box mt={2} ml="auto" mr="auto">
            <Typography variant="h1">Reset your password</Typography>
          </Box>
          <Box width={350} ml="auto" mr="auto">
            <TextField
              type="password"
              name="password"
              id="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={handleInput}
              autoComplete="off"
              required
              fullWidth
              className={textFieldStyle}
              onCut={handlePrevent}
              onCopy={handlePrevent}
              onPaste={handlePrevent}
            />
            <TextField
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Re Enter password"
              value={confirmPassword}
              onChange={handleInput}
              autoComplete="off"
              required
              fullWidth
              className={textFieldStyle}
              onCut={handlePrevent}
              onCopy={handlePrevent}
              onPaste={handlePrevent}
            />
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(event)
                }
                disabled={disableButton()}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
