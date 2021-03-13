import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  getOrganizationDetails,
  getOrganizationSummary,
} from "../../redux/actions/organization";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import FiberNewOutlinedIcon from "@material-ui/icons/FiberNewOutlined";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { ORGANIZATION_DASHBOARD } from "../../routes/config";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";
// import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import Typography from "@material-ui/core/Typography";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { replaceStr } from "../../util";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useOrganizationSummary } from "../../redux/state/organization";

const Banner = React.lazy(() => import("../common/Banner"));
const InfoCard = React.lazy(() => import("../common/InfoCard"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const useStyles = makeStyles((theme: Theme) => ({
  summaryGridStyle: {
    minHeight: 170,
  },
  bannerStyle: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 58,
      marginBottom: 24,
    },
  },
}));

const Dashboard = () => {
  const { summaryGridStyle, bannerStyle } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);

  /* Redux hooks */
  const { token, organizationId } = useLogin();
  const { summary } = useOrganizationSummary();

  useEffect(() => {
    dispatch(getOrganizationDetails(organizationId));
    dispatch(getOrganizationSummary(organizationId));
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

  const viewDepartments = () => {
    history.push(
      replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", organizationId)
    );
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
        {/* <Box>
                    <Typography variant="h6">Account Created On 28 March 2020</Typography> 
                </Box> */}
      </Box>
      <Box mt={2} className={bannerStyle}>
        <Banner />
      </Box>
      <Box my={5} className={summaryGridStyle}>
        <Box mb={5}>
          <Typography variant="h2">Departments Summary</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={PollOutlinedIcon}
              title="Total Departments"
              value={summary?.totalDepartments}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={PollOutlinedIcon}
              title="Active Departments"
              value={summary?.totalActiveDepartments}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={PollOutlinedIcon}
              title="InActive Departments"
              value={summary?.totalInActiveDepartments}
            />
          </Grid>
        </Grid>
      </Box>
      <Box my={5} className={summaryGridStyle}>
        <Box mb={5}>
          <Typography variant="h2">Projects Summary</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={AccountTreeOutlinedIcon}
              title="Total Projects"
              value={summary?.totalProjects}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={AccountTreeOutlinedIcon}
              title="Active Projects"
              value={summary?.totalActiveProjects}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={ArchiveOutlinedIcon}
              title="InActive Projects"
              value={summary?.totalInActiveProjects}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={PublicOutlinedIcon}
              title="Public Projects"
              value={summary?.totalPublicProjects}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={SecurityOutlinedIcon}
              title="Private Projects"
              value={summary?.totalPrivateProjects}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={summaryGridStyle}>
        <Box mb={5}>
          <Typography variant="h2">Boards Summary</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={DashboardOutlinedIcon}
              title="Total Boards"
              value={summary?.totalBoards}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={FiberNewOutlinedIcon}
              title="New Boards"
              value={summary?.totalNewBoards}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={AssignmentOutlinedIcon}
              title="In progress Boards"
              value={summary?.totalInProgressBoards}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <InfoCard
              icon={CheckCircleOutlineIcon}
              title="Completed Boards"
              value={summary?.totalCompletedBoards}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
