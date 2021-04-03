import * as routePath from "../../routes/config";

import { LOGIN, USER } from "../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import { DRAWER_WIDTH } from "../../util/constants";
import DoLogo from "../common/DoLogo";
import DoLogoIcon from "../common/DoLogo";
import Hidden from "@material-ui/core/Hidden";
import PrivateRoute from "../../routes/PrvateRoute";
import { Switch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./Account/userAvatar";
import { useAuthenticated } from "../../redux/state/common";

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("./Account"));
const PersistentDrawerLeft = React.lazy(() => import("../Drawer/DrawerLeft"));
const Dashboard = React.lazy(() => import("../Dashboard"));
const ProjectDashboard = React.lazy(() => import("../Project"));
const BoardDashboard = React.lazy(() => import("../Board"));
const DepartmentDashboard = React.lazy(() => import("../Department"));
const Team = React.lazy(() => import("../Team"));
const Members = React.lazy(() => import("../Members/Members"));
const Notifications = React.lazy(() => import("../Notifications"));
const IndividualDashboard = React.lazy(() => import("../IndividualDashboard"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBarStyle: () => ({
    height: 60,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 0,
    background: "#fff !important",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      background: "#fff !important",
    },
  }),
  appBarAuthenticatedStyle: () => ({
    height: 60,
    width: "100%",
    // paddingLeft: 10,
    paddingRight: 10,
    background: "none",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
    [theme.breakpoints.down("xs")]: {
      background: "#fff !important",
    },
  }),
  toolbar: theme.mixins.toolbar,
  content: (props: any) => ({
    flexGrow: 1,
    // backgroundColor: "#f6f6f7",
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // minHeight: "90vh",
    paddingTop: !props.authenticated ? 90 : 55,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 60,
      // padding: theme.spacing(1),
    },
  }),
  showNothing: {
    display: "none",
  },
}));

const protectedRoutes = () => {
  return [
    {
      path: routePath.COMMERCIAL_DASHBOARD,
      component: Dashboard,
    },
    {
      path: routePath.INDIVIDUAL_DASHBOARD,
      component: IndividualDashboard,
    },
    {
      path: routePath.USER_DASHBOARD,
      component: DepartmentDashboard,
    },
    {
      path: routePath.DEPARTMENT_DASHBOARD,
      component: ProjectDashboard,
    },
    {
      path: routePath.PROJECT_DASHBOARD,
      component: BoardDashboard,
    },
    {
      path: routePath.TEAM,
      component: Team,
    },
    {
      path: routePath.MEMBERS_LIST,
      component: Members,
    },
    {
      path: routePath.NOTIFICATIONS,
      component: Notifications,
    },
  ];
};

const Header = () => {
  const userAuthenticated = useAuthenticated();
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname as string;
  // const { name } = useUser();

  /* Local state */
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(userAuthenticated);
  const showLogo =
    !authenticated &&
    ((pathname?.toLowerCase() !== "/login" &&
      pathname?.toLowerCase() !== "/signup") ||
      pathname?.includes("/board"));
  const {
    root,
    appBarStyle,
    content,
    toolbar,
    showNothing,
    appBarAuthenticatedStyle,
  } = useLocalStyles({ authenticated });

  useEffect(() => {
    setAuthenticated(userAuthenticated);
  }, [userAuthenticated]);

  const handleCreateUser = () => {
    history.push(USER);
  };

  const handleLogin = () => {
    history.push(LOGIN);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAccount = () => {
    setOpen(!open);
  };

  const renderAppbar = () => {
    return (
      <Box mt={1} display="flex" justifyContent="space-between">
        <Hidden only={["xl", "lg", "md", "sm"]}>
          <DoLogoIcon />
        </Hidden>
        {showLogo && (
          <Hidden only={["xs"]}>
            {" "}
            <DoLogo />
          </Hidden>
        )}
        {!authenticated && pathname !== "/login" && pathname !== "/signup" ? (
          <Box display="flex" justifyContent="space-between">
            <Box mt={0.4} mr={2}>
              <Button
                onClick={() => handleLogin()}
                size="small"
                aria-label="add"
                color="primary"
                variant="outlined"
              >
                Login
              </Button>
            </Box>
            <Box mt={0.4} mr={2}>
              <Button
                onClick={() => handleCreateUser()}
                size="small"
                aria-label="add"
                color="primary"
                variant="contained"
              >
                <Typography variant="h6" color="secondary">
                  Sign up
                </Typography>
              </Button>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
        {authenticated && <UserAvatar handleAccount={handleAccount} />}
      </Box>
    );
  };

  return (
    <Box
      className={`${root} ${
        pathname?.includes("/board") && (authenticated || !authenticated)
          ? showNothing
          : ""
      }`}
    >
      {!pathname?.includes("/board") &&
      pathname !== "/login" &&
      pathname !== "/signup" ? (
        <AppBar
          className={`${
            authenticated || pathname?.includes("/board")
              ? appBarAuthenticatedStyle
              : appBarStyle
          }`}
        >
          {!authenticated ? (
            <Container>{renderAppbar()}</Container>
          ) : (
            renderAppbar()
          )}
        </AppBar>
      ) : null}
      <Box className={toolbar} />
      {!pathname.includes("/board") && authenticated && (
        <Hidden only={["xs"]}>
          <PersistentDrawerLeft />
        </Hidden>
      )}
      {authenticated && (
        <PersistentDrawerRight
          open={open}
          handleDrawerClose={handleDrawerClose}
        >
          <UserAccount handleDrawerClose={handleDrawerClose} />
        </PersistentDrawerRight>
      )}
      {!pathname.includes("/board") && authenticated && (
        <main className={content}>
          <Switch>
            {protectedRoutes().map(
              (route: { [Key: string]: any }, index: number) => (
                <PrivateRoute
                  exact
                  key={"private-" + index}
                  component={route.component}
                  path={route.path}
                />
              )
            )}
          </Switch>
        </main>
      )}
    </Box>
  );
};

export default Header;
