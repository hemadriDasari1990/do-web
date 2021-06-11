import {
  FORGOT_PASSWORD,
  RESEND_ACTIVATION,
  SIGNUP,
} from "../../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useLoading, useLogin } from "../../../redux/state/login";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoLogo from "../../common/DoLogo";
import { EMAIL_PATTERN } from "../../../util/regex";
import Link from "@material-ui/core/Link";
import Loader from "../../Loader/components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { login } from "../../../redux/actions/login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
  boxStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    // marginTop: "10%",
    padding: "25px 40px",
    boxShadow: "rgb(0 0 0 / 10%) 0 0 10px",
    [theme.breakpoints.down("xs")]: {
      boxShadow: "unset",
    },
  },
}));

const Login = () => {
  const { textFieldStyle, boxStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { token, message } = useLogin();
  const { loading } = useLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [apiTriggered, setApiTriggered] = useState(false);
  const [showError, setShowError] = useState(false);

  /* React Hooks */
  useEffect(() => {
    if (!loading && apiTriggered && token) {
      setApiTriggered(false);
      // history.push(DASHBOARD);
    }
    if (!loading && apiTriggered && !token) {
      setShowError(true);
      setApiTriggered(false);
    }
  }, [loading, apiTriggered, token]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setApiTriggered(false);
    dispatch(login(formData));
    setApiTriggered(true);
  };

  const handleReset = () => {
    setFormData({
      uniqueKey: "",
      password: "",
    });
  };

  const handleCreateUser = () => {
    history.push(SIGNUP);
  };

  const disableButton = () => {
    if (!email?.trim().length || !EMAIL_PATTERN.test(email)) {
      return true;
    }
    if (password?.trim().length < 6) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setShowError(false);
  };

  const handleForgotPassword = () => {
    history.push(FORGOT_PASSWORD);
  };

  const handleActivationLink = () => {
    history.push(RESEND_ACTIVATION);
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Loader enable={loading} backdrop={true} />
      <Box my={5}>
        <DoLogo justifyContent="center" color="primary" />
      </Box>
      <Box maxWidth={400} m="auto" className={boxStyle}>
        <Box textAlign="center">
          <Typography variant="h3">Log in to Letsdoretro</Typography>
        </Box>
        <TextField
          name="email"
          id="email"
          label="E-mail Address"
          placeholder="Enter Email Address"
          value={email}
          onChange={handleInput}
          autoComplete="off"
          required
          className={textFieldStyle}
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChange={handleInput}
          autoComplete="off"
          required
          className={textFieldStyle}
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
        <Box mt={3} display="flex">
          <Box mr={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleSubmit(event)
              }
              disabled={disableButton()}
            >
              Login
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </Box>
        </Box>
        <Box mt={3} display="flex">
          <Box>
            <Typography variant="subtitle2">
              If you forgot your password in all the excitment of signing up,
              you can{" "}
              <Link component="button" onClick={handleForgotPassword}>
                <Typography variant="subtitle2" color="primary">
                  reset your password
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box mt={3} display="flex">
          <Box>
            <Typography variant="subtitle2">
              Activation confirmation link expired?{" "}
              <Link component="button" onClick={handleActivationLink}>
                <Typography variant="subtitle2" color="primary">
                  click here
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box mt={3} display="flex">
          <Box>
            <Typography variant="subtitle2">
              Can't login?&nbsp;
              <Link component="button" onClick={handleCreateUser}>
                <Typography variant="subtitle2" color="primary">
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
        <DoSnackbar open={showError} handleClose={handleClose} status="error">
          <Typography variant="h6" color="secondary">
            {message}
          </Typography>
        </DoSnackbar>
      </Box>
    </React.Fragment>
  );
};

export default Login;
