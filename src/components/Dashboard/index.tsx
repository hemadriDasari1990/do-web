import {
  FEATURES,
  GETTING_STARTED,
  PROJECTS,
  REACTIONS,
  RETROSPECTIVE,
} from "../../routes/config";
import React, { Suspense, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  getBoardsByUser,
  getUserDetails,
  getUserSummary,
} from "../../redux/actions/user";
import { useAuthenticated, useDefaultSections } from "../../redux/state/common";
import { useProject, useProjectLoading } from "../../redux/state/project";
import {
  useUser,
  useUserLoading,
  useUserSummary,
} from "../../redux/state/user";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Banner from "../common/Banner";
import BoardList from "../Board/List";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CallMadeIcon from "@material-ui/icons/CallMade";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import InfoCard from "../common/InfoCard";
import ListSkeleton from "../common/skeletons/list";
import Loader from "../Loader/components";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ProjectList from "../Project/List";
import ProjectOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import Typography from "@material-ui/core/Typography";
import UpdateBoard from "./Update";
import { clearLogin } from "../../redux/actions/login";
import { getDefaultSections } from "../../redux/actions/common";
import { getProjects } from "../../redux/actions/project";
import { initiateSocketConnection } from "../../socket";
import { storeSocketInstance } from "../../redux/actions/socket";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import useStyles from "../styles";

const drawerWidth = 339;

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
    padding: "10px 10px",
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
  const { summaryGridStyle } = useLocalStyles();
  const { breakText } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { defaultSections } = useDefaultSections();
  const authenticated: boolean = useAuthenticated();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);

  /* Redux hooks */
  const { loginSuccess, userId } = useLogin();
  const { summary } = useUserSummary();
  const { projects, totalProjects } = useProject();
  const { loading: projectLoading } = useProjectLoading();
  const { boards, name, isStarted } = useUser();
  const { loading } = useUserLoading();

  useEffect(() => {
    loadData();
    if (authenticated) {
      const socket: any = initiateSocketConnection();
      dispatch(storeSocketInstance(socket));
    }
  }, []);

  const loadData = () => {
    dispatch(getUserDetails(userId));
    dispatch(getUserSummary(userId));
    dispatch(getProjects(userId, "", 0, 4));
    dispatch(getBoardsByUser(userId, 4));
  };

  useEffect(() => {
    if (loginSuccess && authenticated) {
      setShowSuccess(true);
      dispatch(clearLogin());
    }
    if (!defaultSections?.length) {
      dispatch(getDefaultSections());
    }
  }, [loginSuccess, authenticated]);

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

  const handleReactions = () => {
    const win: any = window.open(REACTIONS, "_blank");
    win.focus();
  };

  return (
    <Suspense fallback={<Loader loading={true} backdrop={true} />}>
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
          <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box display="flex">
                  <Typography variant="h1" style={{ fontWeight: 300 }}>
                    Welcome, &nbsp;
                  </Typography>
                  <Typography variant="h1">{name || ""}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleProjects()}
                  startIcon={<ProjectOutlinedIcon />}
                >
                  <Typography variant="subtitle1" color="secondary">
                    Create Project
                  </Typography>
                </Button>
              </Box>
              <Box>
                <UpdateBoard />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
            <Typography variant="h5" className={breakText}>
              We’re so glad you’re here. This is the very beginning of your
              retrospective journey to exceptional retrospectives.
            </Typography>
          </Grid>
        </Grid>
        <Box px={2} pt={2}>
          <Typography variant="h2">Overall Summary</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                      value={
                        summary?.totalBoards > 0 ? summary?.totalBoards : 0
                      }
                      index={3}
                    />

                    <Box my={2}>
                      <Divider />
                    </Box>
                    <SummaryItem
                      title="New Boards"
                      icon={DashboardOutlinedIcon}
                      value={
                        summary?.totalNewBoards > 0
                          ? summary?.totalNewBoards
                          : 0
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
            {!isStarted ? (
              <Grid container spacing={2}>
                <Grid item xl={5} lg={5} md={4} sm={4} xs={4}>
                  <Box pt={2}>
                    <Typography variant="h2">Getting Started</Typography>
                    <Box mt={2}>
                      <Banner
                        title="For non-annonymous"
                        subTitle="0 of 4 complete (About 2 minutes total)"
                        titleSecondary="For annonymous"
                        subTitleSecondary="About 30-45 seconds total"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
                  <Box pt={2}>
                    <Typography variant="h2">Get to Know More</Typography>
                    <Box mt={2}>
                      <InfoCard
                        title="How to get started? Take a look at our getting started guide"
                        icon={CallMadeIcon}
                        index={0}
                        handleButton={() => handleGettingStarted()}
                      />
                    </Box>
                    <Box mt={2}>
                      <InfoCard
                        title="What features are offered by letsdoretro.com?"
                        icon={CallMadeIcon}
                        index={5}
                        handleButton={() => handleFeatures()}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
                  <Box pt={7.6}>
                    <Box mt={2}>
                      <InfoCard
                        title="What is Sprint Retrospective and how to run?"
                        handleButton={() => handleRetrospective()}
                        icon={CallMadeIcon}
                        index={3}
                      />
                    </Box>
                    <Box mt={2}>
                      <InfoCard
                        title="What's Reaction and how to add one?"
                        icon={CallMadeIcon}
                        index={6}
                        handleButton={() => handleReactions()}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {projectLoading && <ListSkeleton />}
                    {!projectLoading && totalProjects ? (
                      <>
                        <Box
                          mb={1}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Typography variant="h2">Recent Projects</Typography>
                          <Box mt={1} mr={1}>
                            <Button
                              // variant="outlined"
                              color="primary"
                              onClick={() => handleProjects()}
                              endIcon={<ArrowForwardOutlinedIcon />}
                            >
                              <Typography variant="subtitle1">
                                View All ({totalProjects || 0})
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                        <ProjectList projects={projects} hideMenu={true} />
                      </>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box mb={1} display="flex" justifyContent="space-between">
                      <Typography variant="h2">Recent Boards</Typography>
                    </Box>
                    {loading && <ListSkeleton />}
                    {!loading && boards?.length ? (
                      <BoardList
                        boards={boards}
                        hideMenu={true}
                        showProject={true}
                        // lastBoard={lastBoard}
                      />
                    ) : (
                      <Box my={5} display="flex" justifyContent="center">
                        <Typography variant="h3">No recent boards</Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
};

export default Dashboard;
