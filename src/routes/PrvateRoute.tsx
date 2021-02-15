import { Redirect, Route, RouteProps } from 'react-router-dom'

import React from 'react';
import { useAuthenticated } from "../redux/state/common";

type PrivateRouteProps = {
    path: RouteProps['path'];
    component: React.ElementType;
    exact?: boolean; 
  };

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }: any) => {
  const authenticated = useAuthenticated();
    return (
      <Route
        exact
        {...rest}
        render={props =>
          authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }

  export default PrivateRoute;