import React from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/index';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

export default AuthRoute;
