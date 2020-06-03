import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts/index';
// import PrivateRoute from './PrivateRoute';
// import TraineeRoutes from '../pages/Trainee/index';

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('Token');
  return (
    <>
      {token ? (
        <Redirect to="/trainee" />
      )
        : (
          <Route
            {...rest}
            render={(matchProps) => (
              <AuthLayout>
                <Component {...matchProps} />
              </AuthLayout>
            )}
          />
        )}
    </>
  );
};

export default AuthRoute;

AuthRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.any).isRequired,
};
