import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useForgotPassword, useLoading } from "../../../redux/state/login";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import { EMAIL_PATTERN } from "../../../util/regex";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { forgotPassword } from "../../../redux/actions/login";
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

  /* Redux hooks */
  const { response, errorId } = useForgotPassword();
  const { loading } = useLoading();

  /* Local state */
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    email: "",
  });
  const { email } = formData;

  /* React Hooks */
  useEffect(() => {
    if (!loading && response && !errorId) {
      setShowSnackbar(true);
      //   history.push(LOGIN);
    }
    if (!loading && errorId) {
      setShowSnackbar(true);
    }
    // if (!loading && response?.errorId === ALREADY_VERIFIED) {
    //   setShowSnackbar(true);
    //   //   history.push(LOGIN);
    // }
  }, [loading, response]);

  useEffect(() => {
    // dispatch(
    //   verifyToken({
    //     token: token,
    //   })
    // );
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(forgotPassword(formData));
  };

  const handleClose = () => {
    setShowSnackbar(false);
    // history.push(LOGIN);
  };

  const disableButton = () => {
    if (!email.trim().length || !EMAIL_PATTERN.test(email)) {
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
        <Box textAlign="center" py={5}>
          <Box mt={8}>
            <Zoom in={true} timeout={2000}>
              <DoImage
                src="forgot-password.svg"
                height="200px"
                width="fit-content"
                placeholderImg="forgot-password.svg"
                errorImg="forgot-password.svg"
              />
            </Zoom>
          </Box>
          <Box width={350} ml="auto" mr="auto">
            <Box mt={2}>
              <Typography variant="h2">Reset your password</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h5">
                To receive a link to reset your password, please enter your
                email address.
              </Typography>
            </Box>
            <TextField
              name="email"
              id="email"
              label="User Email Address"
              placeholder="Enter Your Email Address"
              value={email}
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
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
