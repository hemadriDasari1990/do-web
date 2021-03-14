import {
  ALREADY_VERIFIED,
  NOT_FOUND,
  TOKEN_EXPIRED,
} from "../../../util/constants";
import { CREATE, LOGIN } from "../../../routes/config";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useLoading, useVerifyToken } from "../../../redux/state/login";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import VerifiedIcon from "../../../assets/verified.svg";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
// import { replaceStr } from "../../../util";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../../redux/actions/login";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));
const Loader = React.lazy(() => import("../../Loader/components"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const VerifyAccount = () => {
  const { boxStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();

  /* Redux hooks */
  const { response } = useVerifyToken();
  const { loading } = useLoading();

  /* Local state */
  const [showSnackbar, setShowSnackbar] = useState(false);

  /* React Hooks */
  useEffect(() => {
    if (!loading && response && !response?.errorId) {
      setShowSnackbar(true);
      //   history.push(LOGIN);
    }
    if (!loading && response?.errorId) {
      setShowSnackbar(true);
    }
    if (!loading && response?.errorId === ALREADY_VERIFIED) {
      setShowSnackbar(true);
      //   history.push(LOGIN);
    }
  }, [loading, response]);

  useEffect(() => {
    dispatch(
      verifyToken({
        token: token,
      })
    );
  }, []);

  const handleClose = () => {
    setShowSnackbar(false);
    // history.push(LOGIN);
  };

  const handleCreateOrganization = () => {
    history.push(CREATE);
  };

  const handleLogin = () => {
    history.push(LOGIN);
  };

  const handleResend = () => {};

  return (
    <React.Fragment>
      <Container>
        <Loader enable={loading} />
        <DoSnackbar
          open={showSnackbar}
          handleClose={handleClose}
          status={
            response?.errorId && response?.errorId !== ALREADY_VERIFIED
              ? "error"
              : "success"
          }
        >
          <Typography variant="h6" color="secondary">
            {response?.message}
          </Typography>
        </DoSnackbar>
        {!loading && (
          <Box mt={8} textAlign="center">
            <Zoom in={true} timeout={2000}>
              <img src={VerifiedIcon} height="200px" width="fit-content" />
            </Zoom>
          </Box>
        )}
        <Box className={boxStyle}>
          {!loading && (
            <Box>
              <Typography variant="h1">{response?.message} </Typography>
            </Box>
          )}
          {response?.errorId === TOKEN_EXPIRED ||
            (response?.errorId === NOT_FOUND && (
              <Box className={boxStyle}>
                <Typography variant="h1">{response?.message} </Typography>
              </Box>
            ))}
          <Box textAlign="center" mt={3}>
            {(response?.errorId === ALREADY_VERIFIED || !response?.errorId) &&
              !loading && (
                <Box mt={0.4} mr={2}>
                  <Button
                    onClick={() => handleLogin()}
                    size="small"
                    aria-label="add"
                    color="primary"
                    variant="outlined"
                  >
                    Login Now
                  </Button>
                </Box>
              )}
            {!loading && response?.errorId === TOKEN_EXPIRED && (
              <Box mt={0.4} mr={2}>
                <Button
                  onClick={() => handleResend()}
                  size="small"
                  aria-label="add"
                  color="primary"
                  variant="outlined"
                >
                  Resend Token
                </Button>
              </Box>
            )}
            {response?.errorId === NOT_FOUND && !loading && (
              <Box mt={0.4} mr={2}>
                <Button
                  onClick={() => handleCreateOrganization()}
                  size="small"
                  aria-label="add"
                  color="primary"
                  variant="contained"
                >
                  <Typography variant="h6" color="secondary">
                    Get started
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default VerifyAccount;
