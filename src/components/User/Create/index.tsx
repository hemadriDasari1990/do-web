import { LOGIN, PRIVACY_POLICY, TERMS } from "../../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useUser, useUserLoading } from "../../../redux/state/user";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DoLogo from "../../common/DoLogo";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createUser } from "../../../redux/actions/user";
import { emailRegex } from "../../../util/regex";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));
const Loader = React.lazy(() => import("../../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(2),
  },
  boxStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    padding: "25px 40px",
    boxShadow: "rgb(0 0 0 / 10%) 0 0 10px",
    [theme.breakpoints.down("xs")]: {
      boxShadow: "unset",
    },
  },
}));

const Create = () => {
  const { textFieldStyle, boxStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /* Redux hooks */
  const { user, message } = useUser();
  const { loading } = useUserLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAgreed: false,
  });
  const { name, email, password, confirmPassword, isAgreed } = formData;
  const [apiTriggered, setApiTriggered] = useState(false);
  const [showError, setShowError] = useState(false);

  /* React Hooks */
  useEffect(() => {
    if (!loading && apiTriggered && !user?.errorId) {
      setShowError(true);
      handleReset();
    }
    if (!loading && apiTriggered && user?.errorId) {
      setShowError(true);
    }
  }, [loading, apiTriggered, user]);

  useEffect(() => {}, []);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setApiTriggered(false);
    dispatch(createUser(formData));
    setApiTriggered(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLogin = () => {
    history.push(LOGIN);
  };

  const disableButton = () => {
    if (!name.trim().length) {
      return true;
    }

    if (!email.trim().length || !emailRegex.test(email)) {
      return true;
    }
    if (password.trim().length < 6) {
      return true;
    }
    if (confirmPassword.trim().length < 6) {
      return true;
    }

    if (!isAgreed) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setShowError(false);
  };

  const handleAgreed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: !isAgreed });
  };

  const handleTerms = () => {
    const win: any = window.open(TERMS, "_blank");
    win.focus();
  };

  const handlePrivacyStatement = () => {
    const win: any = window.open(PRIVACY_POLICY, "_blank");
    win.focus();
  };

  return (
    <React.Fragment>
      <Loader enable={loading} backdrop={true} />
      <Box my={5}>
        <DoLogo justifyContent="center" color="primary" />
      </Box>
      <Box maxWidth={400} m="auto" className={boxStyle}>
        <Box textAlign="center">
          <Typography variant="h3">Signup for your account</Typography>
        </Box>
        <TextField
          name="name"
          id="name"
          label="Your Name"
          placeholder="Enter Full name"
          value={name}
          onChange={handleInput}
          autoComplete="off"
          required
          fullWidth
          className={textFieldStyle}
        />
        <TextField
          name="email"
          id="email"
          label="Email Address"
          placeholder="Enter Email Address"
          value={email}
          onChange={handleInput}
          autoComplete="off"
          required
          fullWidth
          className={textFieldStyle}
        />
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
        />
        <Box mt={1} mb={2}>
          <FormControlLabel
            labelPlacement="end"
            control={
              <Box mt={-0.3}>
                <Checkbox
                  checked={isAgreed}
                  onChange={handleAgreed}
                  value="false"
                  color="primary"
                  name="isAgreed"
                />
              </Box>
            }
            label={
              <Box mt={2.5}>
                <p style={{ fontSize: 12, fontWeight: 400 }}>
                  I accept the &nbsp;
                  <Link component="button" onClick={handleTerms}>
                    <Typography variant="subtitle2">
                      Terms of Service &nbsp;
                    </Typography>
                  </Link>
                  and have read the &nbsp;
                  <Link component="button" onClick={handlePrivacyStatement}>
                    <Typography variant="subtitle2">
                      Privacy Statement
                    </Typography>
                  </Link>
                </p>
              </Box>
            }
          />
        </Box>
        <Box display="flex">
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
              Register
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
        <Box my={3} display="flex">
          <Box mr={1}>
            <Typography variant="subtitle2">
              Already have an account?
            </Typography>
          </Box>
          <Box mt={-0.3}>
            <Link component="button" onClick={handleLogin}>
              <Typography variant="subtitle2" color="primary">
                Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <DoSnackbar
        open={showError}
        handleClose={handleClose}
        status={!user?.errorId ? "success" : "error"}
      >
        <Typography variant="h6" color="secondary">
          {message}
        </Typography>
      </DoSnackbar>
    </React.Fragment>
  );
};

export default Create;
