import { BOARD_DASHBOARD, USER_DASHBOARD } from "../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { getUserDetails, getUserSummary } from "../../redux/actions/user";
import { useBoard, useBoardLoading } from "../../redux/state/board";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
// import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
// import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { COMMERCIAL } from "../../util/constants";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Divider } from "@material-ui/core";
// import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import FiberNewOutlinedIcon from "@material-ui/icons/FiberNewOutlined";
import Grid from "@material-ui/core/Grid";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import Hidden from "@material-ui/core/Hidden";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
// import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import Typography from "@material-ui/core/Typography";
import UpdateBoard from "./Update";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { replaceStr } from "../../util";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useUserSummary } from "../../redux/state/user";

const DoSnackbar = React.lazy(() => import("../Snackbar/components"));
const Summary = React.lazy(() => import("../common/Summary"));
const SummaryItem = React.lazy(() => import("../common/Summary/item"));

const useStyles = makeStyles((theme: Theme) => ({
  summaryGridStyle: {
    minHeight: 170,
  },
  retroBannerStyle: {
    padding: 30,
    background: "#1f1f5808",
    borderRadius: 6,
  },
}));

const Dashboard = () => {
  const { summaryGridStyle, retroBannerStyle } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useBoardLoading();
  const { board } = useBoard();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);

  /* Redux hooks */
  const { token, userId } = useLogin();
  const { summary } = useUserSummary();

  useEffect(() => {
    dispatch(getUserDetails(userId, COMMERCIAL?.toLowerCase()));
    dispatch(getUserSummary(userId));
  }, []);

  useEffect(() => {
    if (!loading && board?._id) {
      history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
    }
  }, [loading, board]);

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

  const viewDepartments = () => {
    history.push(replaceStr(USER_DASHBOARD, ":userId", userId));
  };

  const handleTeam = () => {};

  return (
    <Box pt={2} pb={2} pl={2}>
      <DoSnackbar
        open={showSuccess}
        handleClose={handleSuccessClose}
        status="success"
      >
        <Typography variant="h6" color="secondary">
          Login successfull
        </Typography>
      </DoSnackbar>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Box>
          <Hidden only={["xs"]}>
            <Typography variant="h1">Dashboard</Typography>
          </Hidden>
          <Hidden only={["xl", "lg", "md", "sm"]}>
            <Typography variant="h2">Dashboard</Typography>
          </Hidden>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => viewDepartments()}
            startIcon={<ViewModuleIcon color="primary" />}
          >
            <Typography variant="h6" color="primary">
              View Departments
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box p={2}>
        <Box mt={3} className={retroBannerStyle}>
          <UpdateBoard />
        </Box>

        <Box my={5} className={summaryGridStyle}>
          <Box mb={3}>
            <Typography variant="h2">Overall Summary</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Summary title="Teams & Members">
                <SummaryItem
                  title="Total Teams"
                  icon={GroupOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalTeams}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="Total Members"
                  icon={PersonOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
              </Summary>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Summary title="Departments">
                <SummaryItem
                  title="Total Departments"
                  icon={GroupOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalTeams}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="Active Departments"
                  icon={PersonOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="InActive Departments"
                  icon={PersonOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
              </Summary>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Summary title="Projects">
                <SummaryItem
                  title="Total Projects"
                  icon={AccountTreeOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalTeams}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="Active Projects"
                  icon={AccountTreeOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="InActive Projects"
                  icon={AccountTreeOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
              </Summary>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Summary title="Boards">
                <SummaryItem
                  title="Total Boards"
                  icon={GroupOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalTeams}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="New Boards"
                  icon={FiberNewOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="In progress Boards"
                  icon={PersonOutlinedIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <SummaryItem
                  title="Completed Boards"
                  icon={CheckCircleOutlineIcon}
                  handleButton={handleTeam}
                  value={summary?.totalMembers}
                />
              </Summary>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
