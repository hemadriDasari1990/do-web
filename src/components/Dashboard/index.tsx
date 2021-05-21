import {
  FEATURES,
  GETTING_STARTED,
  PROJECTS,
  RETROSPECTIVE,
  REACTIONS,
} from "../../routes/config";
import React, { Suspense, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  getBoardsByUser,
  getUserDetails,
  getUserSummary,
} from "../../redux/actions/user";
import { useUser, useUserSummary } from "../../redux/state/user";
import CardTravelIcon from "@material-ui/icons/CardTravel";
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
import Loader from "../Loader/components";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ProjectList from "../Project/List";
// import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import Typography from "@material-ui/core/Typography";
import UpdateBoard from "./Update";
import WelcomeBanner from "../common/WelcomeBanner";
import { clearLogin } from "../../redux/actions/login";
import { getProjects } from "../../redux/actions/project";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useProject } from "../../redux/state/project";
import useStyles from "../styles";
import Tour from "reactour";
import AdminUser from "../common/User";
import { getDefaultSections } from "../../redux/actions/common";
import { useDefaultSections } from "../../redux/state/common";

// import Zoom from "@material-ui/core/Zoom";

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
  const { summaryGridStyle, drawer, drawerPaper } = useLocalStyles();
  const { breakText, tourStyle } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { defaultSections } = useDefaultSections();

  /* React states */
  const [showSuccess, setShowSuccess] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  /* Redux hooks */
  const { loginSuccess, userId } = useLogin();
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
    if (loginSuccess) {
      setShowSuccess(true);
      dispatch(clearLogin());
    }
    if (!defaultSections?.length) {
      dispatch(getDefaultSections());
    }
  }, [loginSuccess]);

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

  const closeTour = () => {
    setTourOpen(false);
  };

  const openTour = () => {
    setTourOpen(true);
  };

  const handleReactions = () => {
    const win: any = window.open(REACTIONS, "_blank");
    win.focus();
  };

  const tourConfig: any = [
    {
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="subtitle1">
              Welcome to letsdoretro.com
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              We're thrilled to count you in the lets do retro community.{" "}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              My name is Hemadri (but please, call me Hemanth), and I'm going to
              show you everything that letsdoretro.com can offer to your team.
              In just 2 mins, you will be able to launch your first
              retrospective board.{" "}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-dashboard-view"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              We're currently on your <b>team dashboard.</b>
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              This is the place where you can see the summary of your account,
              recent projects, boards and most importantly quick retro launch in
              seconds.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              You will also be able to{" "}
              <b>access your recent projects or boards</b> from there.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-create-feedback"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              We'd love your feedback on your experience with our Retro tool
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              You can access this feature to share us the feedback about what
              you like, dis like about the tool and suggestions to improve the
              system.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-create-team"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              Your team members do not need to create a retro account to join a
              retrospective board.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              You can access this feature to manage teams, members and team
              members.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-manage-account"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You can use this feature to manage your account like you can
              change password, email address, name and security questions
              anytime.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="help"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You can use this feature to explore more about retrospectives and
              help you get started.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-user"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You can use this feature to change your avatar. We have plenty of
              cool avatars.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="start-quick-retro"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              Okay, this is cool, but I would like to launch my first
              retrospective now!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Start quick retro is the awesome feature to launch a retrospective
              board in just 3 steps but, we would recommend to create your team
              first and add your team members to the team. If this is already
              done then you're in right place.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              As a step, select the project or if you havent created a project
              then just type your project name or select from the drop down and
              enter description about your project.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              In the 2nd step, choose no of sections.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              In the 3rd step, select the team that you would like to invite to
              join the restrospective session. That's it click on start retro
              button to create the board.
            </Typography>
          </Box>
        </Box>
      ),
      position: "left",
    },
    {
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You're all set! Now all you have to do is to start your first
              retrospective!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Any questions? Hit me up via the chat module on the bottom right
              corner of the page.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="subtitle1">
              We wish you some excellent retrospectives!
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Suspense fallback={<Loader loading={true} backdrop={true} />}>
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={tourOpen}
        // maskClassName="mask"
        rounded={5}
        accentColor="#57f"
        className={tourStyle}
      />
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
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box display="flex">
                  <Typography variant="h1" style={{ fontWeight: 300 }}>
                    Welcome, &nbsp;
                  </Typography>
                  <Typography variant="h1">{name || ""}</Typography>
                </Box>
                <Box p={0.5}>
                  <Typography variant="h5" className={breakText}>
                    We’re so glad you’re here. This is the very beginning of
                    your retrospective journey to exceptional retrospectives.
                  </Typography>
                </Box>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openTour()}
                  startIcon={<CardTravelIcon color="secondary" />}
                >
                  <Typography variant="h6" color="secondary">
                    Welcome Tour
                  </Typography>
                </Button>
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
            {!totalProjects && !boards?.length ? (
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Box pt={2}>
                    <Typography variant="h2">Getting Started</Typography>
                    <Box mt={2}>
                      <Banner
                        title="Do these tasks to get started"
                        subTitle="0 of 4 complete (About 2 minutes total)"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Box pt={2}>
                    <Typography variant="h2">Get to Know More</Typography>
                    <Box mt={2}>
                      <InfoCard
                        title="How to get started? Take a look at our 5 step process"
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
                    showProject={true}
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
    </Suspense>
  );
};

export default Dashboard;
