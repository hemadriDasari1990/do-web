import { PROJECTS, TEAM } from "../../routes/config";
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
import BoardList from "../Board/List";
// import Avatar from "@material-ui/core/Avatar";
// import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
// import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { Divider } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
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

// import Zoom from "@material-ui/core/Zoom";

const drawerWidth = 400;

const DoSnackbar = React.lazy(() => import("../Snackbar/components"));
const Summary = React.lazy(() => import("../common/Summary"));
const SummaryItem = React.lazy(() => import("../common/Summary/item"));

const useStyles = makeStyles((theme: Theme) => ({
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
  const { summaryGridStyle, drawer, drawerPaper } = useStyles();
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
  const { boards } = useUser();

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

  const handleTeam = () => {
    history.push(TEAM);
  };

  const handleProjects = () => {
    history.push(PROJECTS);
  };
  console.log("boards", boards);
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
          <Box className={summaryGridStyle}>
            <Box mb={3}>
              <Typography variant="h2">Overall Summary</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Summary title="Projects">
                  <SummaryItem
                    title="Total Projects"
                    icon={AccountTreeOutlinedIcon}
                    handleButton={handleProjects}
                    value={summary?.totalProjects}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="Active Projects"
                    icon={AccountTreeOutlinedIcon}
                    handleButton={handleProjects}
                    value={summary?.totalActiveProjects}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="InActive Projects"
                    icon={AccountTreeOutlinedIcon}
                    handleButton={handleProjects}
                    value={summary?.totalInActiveProjects}
                  />
                </Summary>
              </Grid>

              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Summary title="Boards">
                  <SummaryItem
                    title="Total Boards"
                    icon={DashboardOutlinedIcon}
                    value={summary?.totalBoards}
                    hideAction={true}
                  />

                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="New Boards"
                    icon={DashboardOutlinedIcon}
                    value={summary?.totalNewBoards}
                    hideAction={true}
                  />
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="In progress Boards"
                    icon={DashboardOutlinedIcon}
                    value={summary?.totalInProgressBoards}
                    hideAction={true}
                  />
                </Summary>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
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
                  <Box my={2}>
                    <Divider />
                  </Box>
                  <SummaryItem
                    title="Completed Boards"
                    icon={DashboardOutlinedIcon}
                    value={summary?.totalCompletedBoards}
                    hideAction={true}
                  />
                </Summary>
              </Grid>
            </Grid>
          </Box>
          {totalProjects ? (
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box my={3} display="flex" justifyContent="space-between">
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
                <Box my={3} display="flex" justifyContent="space-between">
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
        <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
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
