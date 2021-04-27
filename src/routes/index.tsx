import * as routePath from "./config";

import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Apps from "../components/Footer/Apps";
import Box from "@material-ui/core/Box";
import { DASHBOARD } from "./config";
import { DRAWER_WIDTH } from "../util/constants";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Drawer/Profile";
import { useAuthenticated } from "../redux/state/common";
import { useHistory } from "react-router";
import { useParams } from "react-router";

const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
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

const useStyles = makeStyles((theme: Theme) => ({
  boxStyle: (props: any) => ({
    [theme.breakpoints.down("xs")]: {},
  }),
  content: (props: any) => ({
    flexGrow: 1,
    paddingTop: 0,
    paddingRight: theme.spacing(2),
    paddingLeft: props.authenticated ? DRAWER_WIDTH : 0,
    [theme.breakpoints.down("xs")]: {},
  }),
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
    { path: routePath.APPS, component: Apps },
  ];
};

const Routes = () => {
  const authenticated: boolean = useAuthenticated();
  const { boardId } = useParams<{ boardId: string }>();

  const history = useHistory();
  const { boxStyle, content } = useStyles({ authenticated });

  useEffect(() => {
    if (authenticated) {
      history.push(DASHBOARD);
    }
  }, [authenticated]);

  const renderRoutes = () => {
    return (
      <Box className={boxStyle}>
        <Switch>
          <Route
            exact
            key={"private-board"}
            component={SectionDashboard}
            path={routePath.BOARD_DASHBOARD}
          />{" "}
          {/* Route without header and footer */}
          <React.Fragment>
            <Header />
            <main className={content}>
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
            </main>
            {routes().map((route: { [Key: string]: any }, index: number) => (
              <Route
                exact
                key={"Key-" + index}
                component={route.component}
                path={route.path}
              />
            ))}
            {!authenticated && !boardId && <Footer />}
          </React.Fragment>
        </Switch>

        {/* <Redirect
          from="*"
          to={
            accountType == COMMERCIAL
              ? DASHBOARD
              : INDIVIDUAL_DASHBOARD
          }
        /> */}
      </Box>
    );
  };

  return <Suspense fallback={<></>}>{renderRoutes()}</Suspense>;
};

export default Routes;
