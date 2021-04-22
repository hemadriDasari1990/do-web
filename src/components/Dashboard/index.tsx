import {
  FEATURES,
  GETTING_STARTED,
  PROJECTS,
  RETROSPECTIVE,
} from "../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  getBoardsByUser,
  getUserDetails,
  getUserSummary,
} from "../../redux/actions/user";
import { useUser, useUserSummary } from "../../redux/state/user";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Banner from "../common/Banner";
import BoardList from "../Board/List";
// import Avatar from "@material-ui/core/Avatar";
// import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
// import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CallMadeIcon from "@material-ui/icons/CallMade";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { Divider } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import InfoCard from "../common/InfoCard";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ProjectList from "../Project/List";
// import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import Typography from "@material-ui/core/Typography";
import UpdateBoard from "./Update";
import WelcomeBanner from "../common/WelcomeBanner";
import { getProjects } from "../../redux/actions/project";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useProject } from "../../redux/state/project";
import { useSocket } from "../../redux/state/socket";
import useStyles from "../styles";

// import Zoom from "@material-ui/core/Zoom";

const drawerWidth = 410;

const DoSnackbar = React.lazy(() => import("../Snackbar/components"));
const Summary = React.lazy(() => import("../common/Summary"));
const SummaryItem = React.lazy(() => import("../common/Summary/item"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  summaryGridStyle: {
    minHeight: 170,
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    // marginTop: 60,
    zIndex: 1,
    padding: "10px 30px",
    borderRadius: 6,
    border: "none",
    width: drawerWidth,
    background: "#a1a8b612",
    [theme.breakpoints.down("xs")]: {
      width: 376,
    },
  },
  avatarStyle: {
    width: 80,
    height: 80,
    backgroundColor: "#6f7687",
  },
}));

const Dashboard = () => {
  const { summaryGridStyle, drawer, drawerPaper } = useLocalStyles();
  const { breakText } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket } = useSocket();

  // const { name } = useUser();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);

  /* Redux hooks */
  const { token, userId } = useLogin();
  const { summary } = useUserSummary();
  const { projects, totalProjects } = useProject();
  const { boards, name } = useUser();

  useEffect(() => {
    dispatch(getUserDetails(userId));
    dispatch(getUserSummary(userId));
    dispatch(getProjects(userId, "", 0, 3));
    dispatch(getBoardsByUser(userId, 3));
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

  const handleProjects = () => {
    history.push(PROJECTS);
  };

  const handleRetrospective = () => {
    const win: any = window.open(RETROSPECTIVE, "_blank");
    win.focus();
  };

  const handleGettingStarted = () => {
    const win: any = window.open(GETTING_STARTED, "_blank");
    win.focus();
  };

  const handleFeatures = () => {
    const win: any = window.open(FEATURES, "_blank");
    win.focus();
  };

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
      <Grid container spacing={2}>
        <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
          <Box>
            <Box display="flex">
              <Typography variant="h1" style={{ fontWeight: 300 }}>
                Welcome, &nbsp;
              </Typography>
              <Typography variant="h1">{name || ""}</Typography>
            </Box>
            <Box p={0.5}>
              <Typography variant="h5" className={breakText}>
                We’re so glad you’re here. This is the very beginning of your
                retrospective journey to exceptional retrospectives.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box px={2} pt={2}>
        <Typography variant="h2">Overall Summary</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
          <Box className={summaryGridStyle}>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Summary title="Projects">
                  <SummaryItem
                    title="Total Projects"
                    icon={AccountTreeOutlinedIcon}
                    handleButton={handleProjects}
                    value={summary?.totalProjects || 0}
                    index={0}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="Active Projects"
                    icon={AccountTreeOutlinedIcon}
                    value={summary?.totalActiveProjects || 0}
                    index={1}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="InActive Projects"
                    icon={AccountTreeOutlinedIcon}
                    value={summary?.totalInActiveProjects || 0}
                    index={2}
                  />
                </Summary>
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Summary title="Boards">
                  <SummaryItem
                    title="Total Boards"
                    icon={DashboardOutlinedIcon}
                    value={summary?.totalBoards > 0 ? summary?.totalBoards : 0}
                    index={3}
                  />

                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="New Boards"
                    icon={DashboardOutlinedIcon}
                    value={
                      summary?.totalNewBoards > 0 ? summary?.totalNewBoards : 0
                    }
                    index={4}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="In progress Boards"
                    icon={DashboardOutlinedIcon}
                    value={
                      summary?.totalInProgressBoards > 0
                        ? summary?.totalInProgressBoards
                        : 0
                    }
                    index={5}
                  />
                </Summary>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Summary title="Teams & Members">
                  <SummaryItem
                    title="Total Teams"
                    icon={GroupOutlinedIcon}
                    value={summary?.totalTeams}
                    index={2}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="Total Members"
                    icon={PersonOutlinedIcon}
                    value={summary?.totalMembers}
                    index={1}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="Completed Boards"
                    icon={DashboardOutlinedIcon}
                    value={
                      summary?.totalCompletedBoards > 0
                        ? summary?.totalCompletedBoards
                        : 0
                    }
                    index={0}
                  />
                </Summary>
              </Grid>
            </Grid>
          </Box>
          {!totalProjects && !boards?.length ? (
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <Box pt={2}>
                  <Typography variant="h2">Getting Started</Typography>
                  <Box mt={2}>
                    <Banner
                      title="Do these tasks to get started"
                      subTitle="4 of 4 complete (About 2 minutes total)"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <Box pt={2}>
                  <Typography variant="h2">
                    Get to Know Restrospective
                  </Typography>
                  <Box mt={2}>
                    <InfoCard
                      title="How to get started? Take a look at our six step process"
                      icon={CallMadeIcon}
                      index={0}
                      handleButton={() => handleGettingStarted()}
                    />
                  </Box>
                  <Box mt={2}>
                    <InfoCard
                      title="What features are offered by letdoretro.com?"
                      icon={CallMadeIcon}
                      index={5}
                      handleButton={() => handleFeatures()}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <Box pt={7.6}>
                  <Box mt={2}>
                    <InfoCard
                      title="What is Sprint Retrospective and how to run?"
                      handleButton={() => handleRetrospective()}
                      icon={CallMadeIcon}
                      index={3}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : null}
          {totalProjects ? (
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box mb={1} display="flex" justifyContent="space-between">
                  <Typography variant="h2">Recent Projects</Typography>

                  <Box mt={1}>
                    <Button
                      // variant="outlined"
                      color="primary"
                      onClick={() => handleProjects()}
                      endIcon={<ArrowForwardOutlinedIcon />}
                    >
                      <Typography variant="subtitle1">
                        View All ({totalProjects})
                      </Typography>
                    </Button>
                  </Box>
                </Box>
                <ProjectList projects={projects} hideMenu={true} />
              </Grid>
            </Grid>
          ) : null}
          {boards?.length ? (
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box mb={1} display="flex" justifyContent="space-between">
                  <Typography variant="h2">Recent Boards</Typography>
                </Box>
                <BoardList
                  boards={boards}
                  hideMenu={true}
                  // lastBoard={lastBoard}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xl={3} lg={3} md={5} sm={12} xs={12}>
          <Drawer
            className={drawer}
            variant="persistent"
            anchor="right"
            open={true}
            classes={{
              paper: drawerPaper,
            }}
          >
            {/* <Box>
                <Typography variant="h3">Profile</Typography>
              </Box>
              <Box py={5}>
                <Box display="flex" justifyContent="center">
                  <Zoom in={true} timeout={2000}>
                    <Avatar className={avatarStyle}>
                      <Typography variant="h1" color="secondary">
                        {name?.substring(0, 1)}
                      </Typography>
                    </Avatar>
                  </Zoom>
                </Box>
                <Box textAlign="center" mt={3}>
                  <Typography variant="h3">{name}</Typography>
                </Box>
              </Box> */}

            <UpdateBoard />
            <Box mt="auto">
              <WelcomeBanner />
            </Box>
          </Drawer>
          {/* <Box mt={1} className={retroBannerStyle}>
              <UpdateBoard />
            </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
