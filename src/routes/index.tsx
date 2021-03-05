import * as routePath from "./config";

import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import { DASHBOARD } from "./config";
// import { replaceStr } from "../util";
import { useAuthenticated } from "../redux/state/common";
import { useHistory } from "react-router";

// import { useLogin } from "../redux/state/login"

const Home = React.lazy(() => import("../components/Home"));

const Developers = React.lazy(() => import("../components/Footer/About"));
const Feedback = React.lazy(() => import("../components/Feedback"));
const Careers = React.lazy(() => import("../components/Footer/Careers"));
const Terms = React.lazy(() => import("../components/Footer/Terms"));
const Organization = React.lazy(
  () => import("../components/Organization/Create")
);
const Login = React.lazy(() => import("../components/Organization/Login"));
const SectionDashboard = React.lazy(() => import("../components/Section"));
const FAQ = React.lazy(() => import("../components/Footer/Faq"));
const Privacy = React.lazy(() => import("../components/Footer/Privacy"));
const Security = React.lazy(() => import("../components/Footer/Security"));
const Features = React.lazy(() => import("../components/Footer/Features"));
const VerifyAccount = React.lazy(
  () => import("../components/Organization/VerifyAccount")
);

const useStyles = makeStyles((theme: Theme) => ({
  boxStyle: (props: any) => ({
    [theme.breakpoints.down("xs")]: {},
    minHeight: !props.authenticated ? "90vh" : "",
  }),
}));

const routes = () => {
  return [
    {
      path: routePath.ROOT,
      component: Home,
    },
    {
      path: routePath.ORGANIZATION,
      component: Organization,
    },
    {
      path: routePath.LOGIN,
      component: Login,
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
  ];
};

const Routes = () => {
  const authenticated: boolean = useAuthenticated();
  const history = useHistory();
  const { boxStyle } = useStyles({ authenticated });
  // const { organizationId } = useLogin();

  useEffect(() => {
    if (authenticated) {
      history.push(DASHBOARD);
    }
  }, [authenticated]);

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
        {/* <Redirect from="*" to={routePath.ROOT} /> */}
      </Box>
    );
  };

  return <Suspense fallback={<></>}>{renderRoutes()}</Suspense>;
};

export default Routes;
