import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../redux/actions/user";

import Typography from "@material-ui/core/Typography";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login";
import { INDIVIDUAL } from "../../util/constants";

const IndividualBoard = React.lazy(() => import("../IndividualBoard"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const Dashboard = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  // const { loading } = useBoardLoading();
  // const { boards } = useBoard();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);

  /* Redux hooks */
  const { token, userId } = useLogin();

  useEffect(() => {
    dispatch(getUserDetails(userId, INDIVIDUAL?.toLowerCase()));
  }, []);

  useEffect(() => {
    socket.on("login-success", () => {
      setShowSuccess(true);
    });
    return () => {
      socket.off("login-success");
    };
  }, [token]);

  /* Handler functions */
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <React.Fragment>
      <DoSnackbar
        open={showSuccess}
        handleClose={handleSuccessClose}
        status="success"
      >
        <Typography variant="h6" color="secondary">
          Login successfull
        </Typography>
      </DoSnackbar>
      <IndividualBoard />
    </React.Fragment>
  );
};

export default Dashboard;
