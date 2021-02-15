import * as routePath from "./config";

import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Box from "@material-ui/core/Box";
import { ORGANIZATION_DASHBOARD } from "./config";
import PrivateRoute from "./PrvateRoute";
import { replaceStr } from "../util";
import { useAuthenticated } from "../redux/state/common";
import { useHistory } from "react-router";
import { useLogin } from "../redux/state/login"

const Home = React.lazy(() => import("../components/Home"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const Developers = React.lazy(() => import("../components/Footer/Developers"));
const Feedback = React.lazy(() => import("../components/Feedback"));
const Careers = React.lazy(() => import("../components/Footer/Careers"));
const Terms = React.lazy(() => import("../components/Footer/Terms"));
const Organization = React.lazy(() => import("../components/Organization/Create"));
const Login = React.lazy(() => import("../components/Organization/Login"));
const ProjectDashboard = React.lazy(() => import("../components/Project"));
const BoardDashboard = React.lazy(() => import("../components/Board"));
const DepartmentDashboard = React.lazy(() => import("../components/Department"));
  
const routes = () => {
    return [
        {
            path: routePath.ROOT,
            component: Home
        },
        {
            path: routePath.ORGANIZATION,
            component: Organization
        },
        {
            path: routePath.LOGIN,
            component: Login
        },
        {
            path: routePath.DEVELOPERS,
            component: Developers
        },
        {
            path: routePath.FEEDBACK,
            component: Feedback
        },
        {
            path: routePath.CAREERS,
            component: Careers
        },
        {
            path: routePath.TERMS,
            component: Terms
        },
        {
            path: routePath.BOARD_DASHBOARD,
            component: BoardDashboard
        }
    ]
}

const protectedRoutes = () => {
    return [
        {
            path: routePath.ORGANIZATION_DASHBOARD,
            component: Dashboard
        },
        {
            path: routePath.DEPARTMENT_DASHBOARD,
            component: DepartmentDashboard
        },
        {
            path: routePath.PROJECT_DASHBOARD,
            component: ProjectDashboard
        }
    ]
}

const Routes = () => {
    const authenticated: boolean = useAuthenticated();
    const history = useHistory();
    const { organizationId } = useLogin();

    useEffect(() => {
        if(authenticated){
            history.push(replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", organizationId));
        }
    }, []);

    const renderRoutes = () => {
        return (
            <Box>
                <Switch>
                    {routes().map((route: {[Key: string]: any}, index: number) => (
                        <Route exact key={"Key-"+index} component={route.component} path={route.path} />
                    ))}
                    {protectedRoutes().map((route: {[Key: string]: any}, index: number) => (
                        <PrivateRoute exact key={"Key-"+index} component={route.component} path={route.path} />
                    ))}
                    <Redirect from="*" to={routePath.ROOT} />
                </Switch>
            </Box>
            
        )
    }
        
    return (
        <React.Fragment>
            {renderRoutes()}
        </React.Fragment>
    )
}

export default Routes;
