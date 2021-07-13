import * as routePath from "./config";

import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router";

import Apps from "../components/Footer/Apps";
import { DASHBOARD } from "./config";
import { DRAWER_WIDTH } from "../util/constants";
import { Hidden } from "@material-ui/core";
import MemberDetails from "../components/Members/Details";
import PersistentDrawerLeft from "../components/Drawer/DrawerLeft";
import Profile from "../components/Drawer/Profile";
import TeamDetails from "../components/Team/Details";
import WhyLetsdoretro from "../components/Footer/why";
import { useAuthenticated } from "../redux/state/common";
import Box from "@material-ui/core/Box";

import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateRoute = React.lazy(() => import("./PrivateRoute"));
const Home = React.lazy(() => import("../components/Home"));
const Developers = React.lazy(() => import("../components/Footer/About"));
const Careers = React.lazy(() => import("../components/Footer/Careers"));
const Terms = React.lazy(() => import("../components/Footer/Terms"));
const User = React.lazy(() => import("../components/User/Create"));
const Login = React.lazy(() => import("../components/User/Login"));
const SectionDashboard = React.lazy(() => import("../components/Section"));
const Privacy = React.lazy(() => import("../components/Footer/Privacy"));
const Security = React.lazy(() => import("../components/Footer/Security"));
const Features = React.lazy(() => import("../components/Footer/Features"));
const VerifyAccount = React.lazy(
  () => import("../components/User/VerifyAccount")
);
const ForgotPassword = React.lazy(
  () => import("../components/User/ForgotPassword")
);
const ResendActivation = React.lazy(
  () => import("../components/User/ResendActivation")
);
const ResetPassword = React.lazy(
  () => import("../components/User/ResetPassword")
);
const Retrospective = React.lazy(
  () => import("../components/Footer/Retrospective")
);
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const BoardDashbaord = React.lazy(() => import("../components/Board"));
const Team = React.lazy(() => import("../components/Team"));
const Members = React.lazy(() => import("../components/Members/Members"));
const Projects = React.lazy(() => import("../components/Project"));
const GettingStarted = React.lazy(() => import("../components/GettingStarted"));
const Reactions = React.lazy(() => import("../components/Footer/Reactions"));
const Templates = React.lazy(
  () => import("../components/Footer/Product/Templates")
);
const Pricing = React.lazy(() => import("../components/Pricing"));

const useStyles = makeStyles((theme: Theme) => ({
  content: (props: any) => ({
    flexGrow: 1,
    paddingTop: 0,
    // paddingRight: theme.spacing(2),
    paddingLeft: props.authenticated ? DRAWER_WIDTH : 0,
    [theme.breakpoints.down("xs")]: {},
  }),
  boxStyle: {
    minHeight: "90vh",
  },
}));

const protectedRoutes = () => {
  return [
    {
      path: routePath.DASHBOARD,
      component: Dashboard,
    },
    {
      path: routePath.PROJECTS,
      component: Projects,
    },
    {
      path: routePath.BOARDS,
      component: BoardDashbaord,
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
      path: routePath.PROFILE,
      component: Profile,
    },
    {
      path: routePath.TEAM_DASHBOARD,
      component: TeamDetails,
    },
    {
      path: routePath.MEMBER_DASHBOARD,
      component: MemberDetails,
    },
  ];
};

const routes = () => {
  return [
    {
      path: routePath.ROOT,
      component: Home,
    },
    {
      path: routePath.SIGNUP,
      component: User,
    },
    {
      path: routePath.LOGIN,
      component: Login,
    },
    {
      path: routePath.FORGOT_PASSWORD,
      component: ForgotPassword,
    },
    {
      path: routePath.ABOUT,
      component: Developers,
    },

    {
      path: routePath.CAREERS,
      component: Careers,
    },
    {
      path: routePath.TERMS,
      component: Terms,
    },
    {
      path: routePath.PRIVACY_POLICY,
      component: Privacy,
    },
    {
      path: routePath.SECURITY,
      component: Security,
    },
    {
      path: routePath.FEATURES,
      component: Features,
    },
    {
      path: routePath.VERIFY,
      component: VerifyAccount,
    },
    {
      path: routePath.RESET_PASSWORD,
      component: ResetPassword,
    },
    {
      path: routePath.RETROSPECTIVE,
      component: Retrospective,
    },
    {
      path: routePath.GETTING_STARTED,
      component: GettingStarted,
    },
    {
      path: routePath.PRICING,
      component: Pricing,
    },
    {
      path: routePath.WHY_LETSDORETRO,
      component: WhyLetsdoretro,
    },
    { path: routePath.APPS, component: Apps },
    { path: routePath.REACTIONS, component: Reactions },
    { path: routePath.TEMPLATES, component: Templates },
    { path: routePath.RESEND_ACTIVATION, component: ResendActivation },
  ];
};

const Routes = () => {
  const authenticated: boolean = useAuthenticated();
  const location = useLocation();
  const pathname = location.pathname as string;
  const isRedirect =
    pathname?.toLowerCase() !== "/getting-started" &&
    pathname?.toLowerCase() !== "/retrospective" &&
    pathname?.toLowerCase() !== "/features" &&
    pathname?.toLowerCase() !== "/reactions" &&
    !pathname?.includes("/board/");
  const history = useHistory();
  const { content, boxStyle } = useStyles({ authenticated });

  useEffect(() => {
    if (authenticated && isRedirect) {
      history.push(DASHBOARD);
    }
  }, [authenticated]);

  return (
    <Suspense fallback={<div />}>
      {!pathname?.includes("/board/") && <Header />}
      {authenticated && isRedirect && (
        <Hidden only={["xs"]}>
          <PersistentDrawerLeft />
        </Hidden>
      )}
      <Box className={boxStyle}>
        <Switch>
          <Route
            exact
            key={"private-board1"}
            path={routePath.BOARD_DASHBOARD}
            render={() => (
              <Suspense fallback={<div />}>
                <SectionDashboard />
              </Suspense>
            )}
          />{" "}
          <Route
            exact
            key={"private-board2"}
            path={routePath.BOARD_DASHBOARD_WITH_TOKEN}
            render={() => (
              <Suspense fallback={<div />}>
                <SectionDashboard />
              </Suspense>
            )}
          />
          <main className={content}>
            {protectedRoutes().map(
              (route: { [Key: string]: any }, index: number) => (
                <Suspense fallback={<div />}>
                  <PrivateRoute
                    exact
                    key={"private-" + index}
                    component={route.component}
                    path={route.path}
                  />
                </Suspense>
              )
            )}
            {routes().map((route: { [Key: string]: any }, index: number) => (
              <Suspense fallback={<div />}>
                <Route
                  exact
                  key={"Key-" + index}
                  component={route.component}
                  path={route.path}
                />
              </Suspense>
            ))}
          </main>
        </Switch>
      </Box>
      {!authenticated && !pathname?.includes("/board/") && <Footer />}

      {/* <Redirect
    from="*"
    to={
      accountType == COMMERCIAL
        ? DASHBOARD
        : INDIVIDUAL_DASHBOARD
    }
  /> */}
    </Suspense>
  );
};

export default Routes;
