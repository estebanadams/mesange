import React from "react";
import { Redirect, Route } from "react-router-dom";

type PrivateRouteProps = {
  Component: React.FC<any>;
  authenticated: boolean;
  path: string;
  excat?: boolean;
  user?: any;
};

export const PrivateRoute = ({
  Component,
  authenticated,
  path,
  user
}: PrivateRouteProps) => {
  return (
    <Route
      path={path}
      render={props =>
        authenticated === true ? (
          <Component {...props} user={user}></Component>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

type PublicRouteProps = {
  Component: React.FC<any>;
  authenticated: boolean;
  path: string;
  exact?: boolean;
};

export const PublicRoute = ({
  Component,
  authenticated,
  path
}: PublicRouteProps) => {
  return (
    <Route
      path={path}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
};
