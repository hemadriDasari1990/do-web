import * as routePath from "./config";

import { Redirect, Route, Switch } from "react-router-dom";

import React from "react";

const Home = React.lazy(() => import("../components/Home"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const Developers = React.lazy(() => import("../components/Footer/Developers"));
const Feedback = React.lazy(() => import("../components/Feedback"));
const Careers = React.lazy(() => import("../components/Footer/Careers"));
const Terms = React.lazy(() => import("../components/Footer/Terms"));

const routes = () => {
    return [
        {
            path: routePath.ROOT,
            component: Home
        },
        {
            path: routePath.DASHBOARD,
            component: Dashboard
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
        }
    ]
}

const Routes = () => {
    const renderRoutes = () => {
        return (
            <Switch>
                {routes().map((route: {[Key: string]: any}, index: number) => (
                    <Route exact key={"Key-"+index} component={route.component} path={route.path} />
                ))}
                <Redirect from="*" to={routePath.ROOT} />
            </Switch>
        )
    }
        
    return (
        <React.Fragment>
            {renderRoutes()}
        </React.Fragment>
    )
}

export default Routes;
