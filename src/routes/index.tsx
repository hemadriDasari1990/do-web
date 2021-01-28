import * as routePath from "./config";

import { Redirect, Route, Switch } from "react-router-dom";

import React from "react";

const Home = React.lazy(() => import("../components/Home"));
const PersistentDrawerRight = React.lazy(() => import("../components/Drawer/DrawerRight"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const Developers = React.lazy(() => import("../components/Footer/Developers"));
const Feedback = React.lazy(() => import("../components/Feedback"));

const routes = () => {
    return [
        {
            path: routePath.CREATE,
            component: PersistentDrawerRight
        },
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
