import * as routePath from "./config";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import React from "react";

const Home = React.lazy(() => import("../components/Home"));
const Create = React.lazy(() => import("../components/Create"));
// const Footer = React.lazy(() => import("../components/Footer"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));

const routes = () => {
    return [
        {
            path: routePath.CREATE,
            component: Create
        },
        {
            path: routePath.ROOT,
            component: Home
        },
        {
            path: routePath.DASHBOARD,
            component: Dashboard
        }
    ]
}

const Routes = () => {
   
    const renderRoutes = () => {
        return (
            <Switch>
                {routes().map((route: {[Key: string]: any}, index: number) => (
                    <Route key={"Key-"+index} component={route.component} path={route.path} />
                ))}
                <Redirect from="*" to={routePath.ROOT} />
            </Switch>
          )
        }
        
    return (
        <React.Fragment>
            <BrowserRouter>
                {renderRoutes()}
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Routes;
