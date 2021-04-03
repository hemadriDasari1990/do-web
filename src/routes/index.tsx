import * as routePath from "./config";

import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import { COMMERCIAL_DASHBOARD, INDIVIDUAL_DASHBOARD } from "./config";
// import { replaceStr } from "../util";
import { useAuthenticated } from "../redux/state/common";
import { useHistory } from "react-router";
import { useLogin } from "../redux/state/login";
import { COMMERCIAL, INDIVIDUAL } from "../util/constants";

// import { useLogin } from "../redux/state/login"

const Home = React.lazy(() => import("../components/Home"));

const Developers = React.lazy(() => import("../components/Footer/About"));
const Feedback = React.lazy(() => import("../components/Feedback"));
const Careers = React.lazy(() => import("../components/Footer/Careers"));
const Terms = React.lazy(() => import("../components/Footer/Terms"));
const User = React.lazy(() => import("../components/User/Create"));
const Login = React.lazy(() => import("../components/User/Login"));
const SectionDashboard = React.lazy(() => import("../components/Section"));
const FAQ = React.lazy(() => import("../components/Footer/Faq"));
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
const useStyles = makeStyles((theme: Theme) => ({
  boxStyle: (props: any) => ({
    [theme.breakpoints.down("xs")]: {},
    // padding: "20px 0px",
    // minHeight: !props.authenticated ? "90vh" : "",
  }),
}));

const routes = () => {
  return [
    {
      path: routePath.ROOT,
      component: Home,
    },
    {
      path: routePath.USER,
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
      path: routePath.FEEDBACK,
      component: Feedback,
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
      path: routePath.BOARD_DASHBOARD,
      component: SectionDashboard,
    },
    {
      path: routePath.FAQ,
      component: FAQ,
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
  ];
};

const Routes = () => {
  const authenticated: boolean = useAuthenticated();
  const history = useHistory();
  const { boxStyle } = useStyles({ authenticated });
  const { accountType } = useLogin();

  useEffect(() => {
    if (authenticated && accountType == COMMERCIAL) {
      history.push(COMMERCIAL_DASHBOARD);
    }
    if (authenticated && accountType == INDIVIDUAL) {
      history.push(INDIVIDUAL_DASHBOARD);
    }
  }, [authenticated, accountType]);

  const renderRoutes = () => {
    return (
      <Box className={boxStyle}>
        <Switch>
          {routes().map((route: { [Key: string]: any }, index: number) => (
            <Route
              exact
              key={"Key-" + index}
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
        {/* <Redirect
          from="*"
          to={
            accountType == COMMERCIAL
              ? COMMERCIAL_DASHBOARD
              : INDIVIDUAL_DASHBOARD
          }
        /> */}
      </Box>
    );
  };

  return <Suspense fallback={<></>}>{renderRoutes()}</Suspense>;
};

export default Routes;
